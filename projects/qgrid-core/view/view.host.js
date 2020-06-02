import { Fastdom } from '../services/fastdom';
import { final } from '../infrastructure/final';
import { jobLine } from '../services/job.line';
import { PathService } from '../path/path.service';
import { PipeUnit } from '../pipe/pipe.unit';
import { eventPath } from '../services/dom';
import {
	stringify,
	getButtonCode,
	checkButtonCode,
	LEFT_BUTTON,
	NO_BUTTON
} from '../mouse/mouse.code';

export class ViewHost {
	constructor(plugin) {
		this.plugin = plugin;

		this.watch(plugin.service);
		this.final = final();
	}

	invalidate() {
		this.final(() => {
			const { view } = this.plugin;
			const { style } = view;

			if (style.needInvalidate()) {
				const rowMonitor = style.monitor.row;
				const cellMonitor = style.monitor.cell;

				Fastdom.mutate(() => {
					// Apply mutate inside another mutate to ensure that style.invalidate is triggered last.
					Fastdom.mutate(() => {
						const domCell = cellMonitor.enter();
						const domRow = rowMonitor.enter();
						try {
							style.invalidate(domCell, domRow);
						}
						finally {
							rowMonitor.exit();
							cellMonitor.exit();
						}
					});
				});
			}
		});
	}

	triggerLine(service, timeout) {
		const { model } = this.plugin;
		const { reduce } = model.pipe();

		let session = [];
		const job = jobLine(timeout);
		return (source, changes, units) => {
			model.scene({ status: 'start' }, {
				source
			});

			session.push(...units);
			job(() => {
				const units = reduce(session, model);
				session = [];

				units.forEach(pipe =>
					service.invalidate({
						source,
						changes,
						pipe,
						why: pipe.why || 'refresh'
					})
				);
			});
		};
	}

	watch(service) {
		const { model, observeReply } = this.plugin;;
		const { triggers } = model.pipe();
		const { pipe } = model.data();

		const triggerJob = this.triggerLine(service, 10);
		if (pipe !== PipeUnit.default) {
			triggerJob('grid', {}, [pipe]);
		}

		Object.keys(triggers)
			.forEach(name =>
				observeReply(model[name + 'Changed'])
					.subscribe(e => {
						if (e.tag.behavior === 'core') {
							return;
						}

						const units = [];
						const trigger = triggers[name];
						for (const key in e.changes) {
							const unit = trigger[key];
							if (unit) {
								units.push(unit);
							}
						}

						if (units.length > 0) {
							triggerJob(e.tag.source || name, e.changes, units);
						}
					}));
	}

	mouseDown(e) {
		const { model, view } = this.plugin;
		const { edit } = model;

		const td = this.findCell(e);

		model.mouse({
			code: stringify(getButtonCode(e)),
			status: 'down',
			target: td
		}, {
			source: 'mouse.down'
		});

		if (checkButtonCode(e, LEFT_BUTTON)) {
			const { area, mode } = this.selection;

			if (td) {
				const fromNotEditMode = edit().status === 'view'

				this.navigate(td);
				if (area === 'body') {
					this.select(td);
				}

				if (fromNotEditMode && view.edit.cell.enter.canExecute(td)) {
					view.edit.cell.enter.execute(td);
				}

				if (mode === 'range') {
					view.selection.selectRange(td, null, 'body');
				}
			}
		}
	}

	mouseMove(e) {
		const { model, view } = this.plugin;
		const { highlight } = view;
		const { rows, cell } = model.highlight();

		const td = this.findCell(e);
		if (td) {

			if (cell) {
				highlight.cell.execute(cell, false);
			}

			const newCell = {
				rowIndex: td.rowIndex,
				columnIndex: td.columnIndex
			};

			if (highlight.cell.canExecute(newCell)) {
				highlight.cell.execute(newCell, true)
			}

			const tr = this.findRow(e);
			if (tr) {
				const { index } = tr;

				if (highlight.row.canExecute(index)) {
					rows
						.filter(i => i !== index)
						.forEach(i => highlight.row.execute(i, false));

					highlight.row.execute(index, true);
				}
			}

			if (this.selection.mode === 'range') {
				const startCell = model.mouse().target;
				const endCell = td;

				if (startCell && endCell) {
					this.navigate(endCell);
					view.selection.selectRange(startCell, endCell, 'body');
				}
			}
		}
	}

	mouseLeave() {
		this.clearHighlight();
	}

	mouseUp(e) {
		const { model } = this.plugin;
		const { edit } = model;
		const td = this.findCell(e);

		model.mouse({
			code: stringify(getButtonCode(e)),
			status: 'up',
			target: td,
		}, {
			source: 'mouse.up'
		});

		if (checkButtonCode(e, LEFT_BUTTON)) {
			if (edit().status === 'startBatch') {
				edit({ status: 'endBatch' }, { source: 'body.ctrl' });
			}
		}

		model.mouse({
			code: stringify(NO_BUTTON),
			status: 'release',
			target: null,
			timestamp: Date.now(),
		}, {
			source: 'mouse.up'
		});
	}

	select(cell) {
		const { area, mode, unit } = this.selection;
		if (cell.column.type !== 'select' && (area !== 'body' || mode === 'range')) {
			return;
		}

		const { model, view } = this.plugin;
		const editMode = model.edit().mode;
		switch (unit) {
			case 'row': {
				if (cell.column.type === 'select' && cell.column.editorOptions.trigger === 'focus') {
					const focusState = model.focus();
					if (focusState.rowIndex !== cell.rowIndex || focusState.columnIndex !== cell.columnIndex) {
						if (view.selection.toggleRow.canExecute(cell.row)) {
							view.selection.toggleRow.execute(cell.row, 'body');
						}
					}
				} else if (!editMode && cell.column.category !== 'control') {
					if (view.selection.toggleRow.canExecute(cell.row)) {
						view.selection.toggleRow.execute(cell.row, 'body');
					}
				}

				break;
			}

			case 'column': {
				if (!editMode) {
					view.selection.toggleColumn.execute(cell.column, 'body');
				}

				break;
			}

			case 'mix': {
				if (cell.column.type === 'row-indicator') {
					view.selection.toggleCell.execute(cell, 'body');
				}

				break;
			}
		}
	}

	navigate(cell) {
		const { view } = this.plugin;
		const { focus } = view.nav;

		if (focus.canExecute(cell)) {
			focus.execute(cell);
		}
	}

	findCell(e) {
		const { table } = this.plugin;
		const pathFinder = new PathService(table.box.bag.body);
		const path = eventPath(e);

		let td = pathFinder.cell(path);
		if (!td) {
			const firstElement = path[0];
			const isEditMarker =
				firstElement
				&& firstElement.classList.contains('q-grid-edit-marker');

			if (isEditMarker) {
				const { model } = this.plugin;
				const { rowIndex, columnIndex } = model.focus();
				td = table.body.cell(rowIndex, columnIndex).model();
			}
		}

		return td;
	}

	findRow(e) {
		const { table } = this.plugin;
		const pathFinder = new PathService(table.box.bag.body);
		const path = eventPath(e);
		return pathFinder.row(path);
	}

	clearHighlight() {
		const { view } = this.plugin;
		const { highlight } = view;
		if (highlight.clear.canExecute()) {
			highlight.clear.execute();
		}
	}

	get selection() {
		const { model } = this.plugin;
		return model.selection();
	}
}
