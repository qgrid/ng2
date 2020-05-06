import { PathService } from '../path/path.service';
import { Fastdom } from '../services/fastdom';
import { GRID_PREFIX } from '../definition';
import { jobLine } from '../services/job.line';
import { eventPath } from '../services/dom';
import { LEFT_BUTTON, checkButtonCode, getButtonCode } from '../mouse/mouse.code';
import { NO_BUTTON } from '../mouse/mouse.code';
import { stringify } from '../mouse/mouse.code';

const VERTICAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-vertical`;
const HORIZONTAL_SCROLL_CLASS = `${GRID_PREFIX}-scroll-horizontal`;
const DEFAULT_DELTA_Y = 100;

export class BodyHost {
	constructor(plugin) {
		this.plugin = plugin;
		this.scrollingJob = jobLine(100);
		this.rangeStartCell = null;
	}

	scroll(e) {
		const { model, table } = this.plugin;
		const { scroll } = model;

		const oldValue = scroll();
		const newValue = {};
		let hasChanges = false;
		if (oldValue.top !== e.scrollTop) {
			table.view.addClass(VERTICAL_SCROLL_CLASS);
			newValue.top = e.scrollTop;
			hasChanges = true;
		}

		if (oldValue.left !== e.scrollLeft) {
			table.view.addClass(HORIZONTAL_SCROLL_CLASS);
			newValue.left = e.scrollLeft;
			hasChanges = true;
		}

		if (hasChanges) {
			scroll(newValue, {
				source: 'body.core',
				behavior: 'core'
			});
		}

		this.scrollingJob(this.scrollEnd.bind(this));
	}

	scrollEnd() {
		const { table } = this.plugin;

		table.view.removeClass(VERTICAL_SCROLL_CLASS);
		table.view.removeClass(HORIZONTAL_SCROLL_CLASS);
	}

	wheel(e) {
		if (e.shiftKey) {
			return;
		}

		const { model, table } = this.plugin;
		if (model.edit().status === 'view') {
			const { scroll } = model;
			const upper = 0;

			Fastdom.measure(() => {
				const lower = table.view.scrollHeight() - table.view.height();
				const deltaY = DEFAULT_DELTA_Y * Math.sign(e.deltaY);
				const top = Math.min(lower, Math.max(upper, scroll().top + deltaY));

				scroll({ top }, { source: 'body.core' });
			});
		}
	}

	mouseDown(e) {
		const { model, view, table } = this.plugin;
		const { edit } = model;

		const pathFinder = new PathService(table.box.bag.body);
		const cell = pathFinder.cell(eventPath(e));

		if (checkButtonCode(e, LEFT_BUTTON)) {
			const { area, mode } = this.selection;
			if (area !== 'body') {
				return;
			}

			if (cell) {
				const { status: beforeSelectStatus } = edit();
				this.navigate(cell);
				this.select(cell);

				if (beforeSelectStatus === 'view' && view.edit.cell.enter.canExecute(cell)) {
					view.edit.cell.enter.execute(cell);
				}

				if (mode === 'range') {
					this.rangeStartCell = cell;

					if (this.rangeStartCell) {
						view.selection.selectRange(this.rangeStartCell, null, 'body');
					}
				}
			}
		}

		model.mouse({
			code: stringify(getButtonCode(e)),
			status: 'down',
			target: cell
		}, {
			source: 'mouse.down'
		});
	}

	mouseMove(e) {
		const { model, view, table } = this.plugin;
		const pathFinder = new PathService(table.box.bag.body);
		const td = pathFinder.cell(eventPath(e));

		if (td) {
			const { highlight } = view;
			const { rows, cell } = model.highlight();

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

			const tr = pathFinder.row(eventPath(e));
			if (tr) {
				const { index } = tr;

				if (highlight.row.canExecute(index)) {
					rows
						.filter(i => i !== index)
						.forEach(i => highlight.row.execute(i, false));

					highlight.row.execute(index, true);
				}
			}
		}

		if (this.selection.mode === 'range') {
			const startCell = this.rangeStartCell;
			const endCell = td;

			if (startCell && endCell) {
				this.navigate(endCell);
				view.selection.selectRange(startCell, endCell, 'body');
			}
		}
	}

	mouseLeave() {
		const { model, view } = this.plugin;
		const { highlight } = view;
		const { rows, cell } = model.highlight();

		rows.forEach(rowIndex => highlight.row.execute(rowIndex, false));

		if (cell) {
			highlight.cell.execute(null, false);
		}
	}

	mouseUp(e) {
		const { model, table } = this.plugin;
		const { mode } = this.selection;
		const { edit } = model;

		const pathFinder = new PathService(table.box.bag.body);
		const cell = pathFinder.cell(eventPath(e));

		if (checkButtonCode(e, LEFT_BUTTON)) {
			if (mode === 'range') {
				this.rangeStartCell = null;
			}

			if (edit().status === 'startBatch') {
				edit({ status: 'endBatch' }, { source: 'body.ctrl' });
			}
		}

		model.mouse({
			code: stringify(getButtonCode(e)),
			status: 'up',
			target: cell,
		}, {
			source: 'mouse.up'
		});

		model.mouse({
			code: stringify(NO_BUTTON),
			status: 'release',
			target: null
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
				} else if (!editMode && cell.column.class !== 'control') {
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

	get selection() {
		const { model } = this.plugin;
		return model.selection();
	}
}
