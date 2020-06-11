
import { uniq } from '../utility/kit';
import { Keyboard } from '../keyboard/keyboard';
import { PathService } from '../path/path.service';
import { eventPath } from '../services/dom';
import { SELECTION_RANGE_COMMAND_KEY } from '../command-bag/selection.range.command';
import { stringify, getButtonCode, NO_BUTTON, LEFT_BUTTON, checkButtonCode } from '../mouse/mouse.code';

export class EventHost {
	constructor(host, plugin) {
		this.host = host;
		this.plugin = plugin;
	}

	keyUp(e) {
		const { model } = this.plugin;
		const { codes } = model.keyboard();

		const code = Keyboard.translate(e.code);
		const index = codes.indexOf(code);
		if (index >= 0) {
			const newCodes = Array.from(codes);
			newCodes.splice(index, 1)
			model.keyboard({
				code,
				codes: newCodes,
				status: 'up'
			}, {
				source: 'event.host'
			});

			if (!newCodes.length) {
				this.keyRelease();
			}
		}
	}

	keyDown(e) {
		const { model } = this.plugin;
		const code = Keyboard.translate(e.code);
		if (e.target.tagName === 'TBODY') {
			const { prevent } = model.navigation();
			if (prevent.has(code)) {
				e.preventDefault();
				e.stopPropagation();
			}
		}

		model.keyboard({
			code,
			codes: uniq(model.keyboard().codes.concat(code)),
			status: 'down'
		}, {
			source: 'event.host'
		});
	}

	keyRelease() {
		const { model } = this.plugin;

		model.keyboard({
			code: null,
			codes: [],
			status: 'release'
		}, {
			source: 'event.host'
		});
	}

	mouseDown(e) {
		const { model, view, commandPalette } = this.plugin;
		const { edit } = model;

		const td = this.findCell(e);

		model.mouse({
			code: stringify(getButtonCode(e)),
			status: 'down',
			target: td
		}, {
			source: 'event.host'
		});

		if (checkButtonCode(e, LEFT_BUTTON)) {
			const { area } = model.selection();

			if (td) {
				const fromNotEditMode = edit().status === 'view'

				this.navigate(td);
				if (area === 'body') {
					this.select(td);
				}

				if (fromNotEditMode && view.edit.cell.enter.canExecute(td)) {
					view.edit.cell.enter.execute(td);
				}

				const selectRange = commandPalette.get(SELECTION_RANGE_COMMAND_KEY);
				if (selectRange.canExecute([td, null])) {
					selectRange.execute([td, null]);
				}
			}
		}
	}

	mouseMove(e) {
		const { model, view, commandPalette } = this.plugin;
		const { highlight } = view;
		const { rows } = model.highlight();

		const td = this.findCell(e);
		if (td) {
			if (highlight.cell.canExecute(td)) {
				highlight.cell.execute(td)
			}

			const tr = this.findRow(e);
			if (tr) {
				const { index } = tr;

				if (highlight.row.canExecute(index)) {
					rows
						.filter(i => i !== index)
						.forEach(i => highlight.row.execute([i, false]));

					highlight.row.execute([index, true]);
				}
			}


			const range = [model.mouse().target, td];
			const selectRange = commandPalette.get(SELECTION_RANGE_COMMAND_KEY);
			if (selectRange.canExecute(range)) {
				this.navigate(range[1]);
				selectRange.execute(range);
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
			source: 'event.host'
		});

		if (checkButtonCode(e, LEFT_BUTTON)) {
			if (edit().status === 'startBatch') {
				edit({
					status: 'endBatch'
				}, {
					source: 'event.host'
				});
			}
		}

		model.mouse({
			code: stringify(NO_BUTTON),
			status: 'release',
			target: null,
			timestamp: Date.now(),
		}, {
			source: 'event.host'
		});
	}

	select(cell) {
		const { model, view } = this.plugin;
		const { area, mode, unit } = model.selection();
		if (cell.column.type !== 'select' && (area !== 'body' || mode === 'range')) {
			return;
		}

		const editMode = model.edit().mode;
		switch (unit) {
			case 'row': {
				if (cell.column.type === 'select' && cell.column.editorOptions.trigger === 'focus') {
					const focusState = model.focus();
					if (focusState.rowIndex !== cell.rowIndex || focusState.columnIndex !== cell.columnIndex) {
						if (view.selection.toggleRow.canExecute(cell.row)) {
							view.selection.toggleRow.execute(cell.row);
						}
					}
				} else if (!editMode && cell.column.category !== 'control') {
					if (view.selection.toggleRow.canExecute(cell.row)) {
						view.selection.toggleRow.execute(cell.row);
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

	focusChange() {
		const { model, table, service } = this.plugin;
		if (table.view.isFocused()) {
			const needFocusCell =
				!model.mouse().target
				&& (model.focus().rowIndex < 0 || model.focus().columnIndex < 0);

			if (needFocusCell) {
				service.focus(
					model.pagination().size * model.pagination().current
				);
			} else {
				model.focus({
					isActive: true
				}, {
					source: 'event.host'
				});
			}
		}
		else {
			model.focus({
				isActive: false
			}, {
				source: 'event.host'
			});
		}
	}
}
