import {View} from '../view';
import {Command} from '../command';
import {Navigation} from './navigation';
import {GRID_PREFIX} from '../definition';
import {CellView} from '../scene/view';

export class NavigationView extends View {
	constructor(model, table, commandManager) {
		super(model);

		this.table = table;

		const shortcut = model.action().shortcut;
		const navigation = new Navigation(model, table);
		let focusBlurs = [];

		this.using(shortcut.register(commandManager, navigation.commands));

		this.focus = new Command({
			execute: cell => model.navigation({cell: new CellView(cell)}),
			canExecute: cell => {
				return cell
					&& cell.column.canFocus
					&& !CellView.equals(cell, model.navigation().cell);
			}
		});

		this.scrollTo = new Command({
			execute: (row, column) => this.scroll(table.view, table.body.cell(row, column)),
			canExecute: (row, column) => table.body.cell(row, column).model() !== null
		});

		this.using(model.navigationChanged.watch(e => {
			if (e.hasChanges('cell')) {
				// We need this one to toggle focus from details to main grid
				// or when user change navigation cell through the model
				if (!this.table.view.isFocused()) {
					this.table.view.focus();
				}

				const navState = e.state;
				const newRow = navState.rowIndex;
				const newColumn = navState.columnIndex;

				focusBlurs = this.invalidateFocus(focusBlurs);
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
		}));

		this.using(model.focusChanged.watch(e => {
			if (e.tag.source !== 'navigation.view') {
				model.navigation({
					cell: table.body.cell(e.state.rowIndex, e.state.columnIndex).model()
				});
			}
		}));

		this.using(model.sceneChanged.watch(e => {
			if (e.hasChanges('status')) {
				const status = e.state.status;
				switch (status) {
					case 'stop':
						focusBlurs = this.invalidateFocus(focusBlurs);
						break;
				}
			}
		}));
	}

	invalidateFocus(dispose) {
		dispose.forEach(f => f());
		dispose = [];

		const navState = this.model.navigation();
		const row = navState.rowIndex;
		const column = navState.columnIndex;
		const cell = this.table.body.cell(row, column);
		if (cell.model()) {
			cell.addClass(`${GRID_PREFIX}-focus`);
			dispose.push(() => cell.removeClass(`${GRID_PREFIX}-focus`));
		}

		return dispose;
	}


	scroll(view, target) {
		const tr = target.rect();
		const vr = view.rect();
		const scrollState = this.model.scroll();

		if (view.canScrollTo(target, 'left')) {
			if (vr.left > tr.left
				|| vr.left > tr.right
				|| vr.right < tr.left
				|| vr.right < tr.right) {

				if (vr.width < tr.width || vr.left > tr.left || vr.left > tr.right) {
					view.scrollLeft(tr.left - vr.left + scrollState.left);
				}
				else if (vr.left < tr.left || vr.right < tr.right) {
					view.scrollLeft(tr.right - vr.right + scrollState.left);
				}

			}
		}

		if (view.canScrollTo(target, 'top')) {
			if (vr.top > tr.top
				|| vr.top > tr.bottom
				|| vr.bottom < tr.top
				|| vr.bottom < tr.bottom) {

				if (vr.height < tr.height || vr.top > tr.top || vr.top > tr.bottom) {
					view.scrollTop(tr.top - vr.top + scrollState.top);
				}
				else if (vr.top < tr.top || vr.bottom < tr.bottom) {
					view.scrollTop(tr.bottom - vr.bottom + scrollState.top);
				}

			}
		}
	}
}