import {View} from '../view';
import {Command, Shortcut} from '../infrastructure';
import {Navigation} from './navigation';
import {GRID_PREFIX} from '../definition';
import {Cell} from '../cell';

export class NavigationView extends View {
	constructor(model, table, commandManager) {
		super(model);

		this.table = table;
		const shortcut = new Shortcut(table, commandManager);
		const navigation = new Navigation(model, table);

		this.shortcutOff = shortcut.register('navigation', navigation.commands);

		this.blur = new Command({
			execute: (row, column) => table.body.cell(row, column).removeClass(`${GRID_PREFIX}-focus`),
			canExecute: (row, column, cell) => {
				return (cell && table.data.columns().indexOf(cell.column) >= 0)
					|| (!cell && table.body.cell(row, column).model !== null);
			}
		});

		this.focus = new Command({
			execute: (row, column) => table.body.cell(row, column).addClass(`${GRID_PREFIX}-focus`),
			canExecute: (row, column, cell) => {
				cell = cell || table.body.cell(row, column).model;
				return cell
					&& cell.column.canFocus
					&& table.data.columns().indexOf(cell.column) >= 0;
			}
		});

		this.focusCell = new Command({
			execute: cell => model.navigation({cell: new Cell(cell)}),
			canExecute: cell => {
				return cell
					&& cell.column.canFocus
					&& table.data.columns().indexOf(cell.column) >= 0
					&& !Cell.equals(cell, model.navigation().cell);
			}
		});

		this.scrollTo = new Command({
			execute: (row, column) => this.scroll(table.view, table.body.cell(row, column)),
			canExecute: (row, column) => table.body.cell(row, column).model !== null
		});

		model.navigationChanged.watch(e => {
			if (e.hasChanges('cell')) {
				const navState = e.state;
				const newTarget = e.changes.cell.newValue;
				const oldTarget = e.changes.cell.oldValue;
				const newRow = navState.rowIndex;
				const newColumn = navState.columnIndex;
				const oldRow = e.changes.cell.oldValue ? e.changes.cell.oldValue.rowIndex : -1;
				const oldColumn = e.changes.cell.oldValue ? e.changes.cell.oldValue.columnIndex : -1;

				if (this.blur.canExecute(oldRow, oldColumn, oldTarget)) {
					this.blur.execute(oldRow, oldColumn);
				}

				if (this.focus.canExecute(newRow, newColumn, newTarget)) {
					this.focus.execute(newRow, newColumn);
				}

				if (e.tag.source !== 'navigation.scroll' && this.scrollTo.canExecute(newRow, newColumn)) {
					this.scrollTo.execute(newRow, newColumn);
				}

				model.focus({
					rowIndex: newRow,
					columnIndex: newColumn
				}, {
					source: 'navigation.view'
				});
			}
		});

		model.focusChanged.watch(e => {
			if (e.tag.source !== 'navigation.view') {
				model.navigation({
					cell: table.body.cell(e.state.rowIndex, e.state.columnIndex).model
				});
			}
		});

		model.viewChanged.watch(e => {
			if (e.tag.behavior !== 'core') {
				model.navigation({cell: null});
			}
		});
	}

	scroll(view, target) {
		const tr = target.rect();
		const cr = view.rect();
		const scrollState = this.model.scroll();

		if (view.canScrollTo(target, 'left')) {
			if (cr.left > tr.left
				|| cr.left > tr.right
				|| cr.right < tr.left
				|| cr.right < tr.right) {
				if (cr.left < tr.left
					|| cr.right < tr.right) {
					view.scrollLeft(tr.right - cr.right + scrollState.left);
				} else if (cr.left > tr.left
					|| cr.left > tr.right) {
					view.scrollLeft(tr.left - cr.left + scrollState.left);
				}
			}
		}

		if (view.canScrollTo(target, 'top')) {
			if (cr.top > tr.top
				|| cr.top > tr.bottom
				|| cr.bottom < tr.top
				|| cr.bottom < tr.bottom) {
				if (cr.top < tr.top
					|| cr.bottom < tr.bottom) {
					view.scrollTop(tr.bottom - cr.bottom + scrollState.top);
				} else if (cr.top > tr.top
					|| cr.top > tr.bottom) {
					view.scrollTop(tr.top - cr.top + scrollState.top);
				}
			}
		}
	}

	destroy() {
		this.shortcutOff();
	}
}