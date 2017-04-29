import View from 'core/view/view';
import Command from 'core/infrastructure/command';
import Shortcut from 'core/infrastructure/shortcut';
import Navigation from 'core/navigation/navigation';
import {GRID_PREFIX} from 'core/definition';

export default class NavigationView extends View {
	constructor(model, table, apply) {
		super(model);

		this.table = table;
		const shortcut = new Shortcut(table, apply);
		const navigation = new Navigation(model, table);

		this.shortcutOff = shortcut.register('navigation', navigation.commands);

		this.blur = new Command({
			execute: (row, column) => table.body.cell(row, column).removeClass(`${GRID_PREFIX}-focus`),
			canExecute: (row, column) => table.body.cell(row, column) !== null
		});

		this.focus = new Command({
			execute: (row, column) => table.body.cell(row, column).addClass(`${GRID_PREFIX}-focus`),
			canExecute: (row, column) => table.body.cell(row, column) !== null
		});

		this.focusCell = new Command({
			execute: cell => model.navigation({row: cell.rowIndex, column: cell.columnIndex, active: {cell: cell}}),
			canExecute: cell => cell && cell.column.canFocus && cell !== model.navigation().active.cell
		});

		this.scrollTo = new Command({
			execute: (row, column) => this.scroll(table.body, table.body.cell(row, column)),
			canExecute: (row, column) => table.body.cell(row, column) !== null
		});

		model.navigationChanged.watch(e => {
			if (e.hasChanges('row') || e.hasChanges('column')) {
				const navState = model.navigation();
				const newRow = navState.row;
				const newColumn = navState.column;
				const oldRow = e.hasChanges('row') ? e.changes.row.oldValue : newRow;
				const oldColumn = e.hasChanges('column') ? e.changes.column.oldValue : newColumn;

				if (this.blur.canExecute(oldRow, oldColumn)) {
					this.blur.execute(oldRow, oldColumn);
				}

				if (this.focus.canExecute(newRow, newColumn)) {
					this.focus.execute(newRow, newColumn);
					if (e.tag.source !== 'navigation') {
						this.scrollTo.execute(newRow, newColumn);
					}
				}

				const cell = table.body.cell(navState.row, navState.column);
				if (cell) {
					if (cell.model !== navState.active.cell) {
						model.navigation({
							active: {
								cell: cell.model
							}
						});
					}
				}
				else {
					model.navigation({
						active: {
							cell: null
						}
					});
				}
			}
		});

		model.viewChanged.watch(() => {
			model.navigation({
				column: -1,
				row: -1
			});
		});
	}

	scroll(container, target) {
		const tr = target.rect();
		const cr = container.rect();
		const scrollState = this.model.scroll();

		if (cr.left > tr.left
			|| cr.left > tr.right
			|| cr.right < tr.left
			|| cr.right < tr.right) {
			if (cr.left < tr.left
				|| cr.right < tr.right) {
				container.scrollLeft(tr.right - cr.right + scrollState.left);
			} else if (cr.left > tr.left
				|| cr.left > tr.right) {
				container.scrollLeft(tr.left - cr.left + scrollState.left);
			}
		}

		if (cr.top > tr.top
			|| cr.top > tr.bottom
			|| cr.bottom < tr.top
			|| cr.bottom < tr.bottom) {
			if (cr.top < tr.top
				|| cr.bottom < tr.bottom) {
				container.scrollTop(tr.bottom - cr.bottom + scrollState.top);
			} else if (cr.top > tr.top
				|| cr.top > tr.bottom) {
				container.scrollTop(tr.top - cr.top + scrollState.top);
			}

		}
	}

	destroy() {
		this.shortcutOff();
	}
}