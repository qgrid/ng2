import { Command } from '../command/command';
import { Navigation } from './navigation';
import { GRID_PREFIX } from '../definition';
import { Fastdom } from '../services/fastdom';
import { Td } from '../dom/td';

export class NavigationView {
	constructor(model, table, shortcut) {
		this.model = model;
		this.table = table;

		const navigation = new Navigation(model, table);
		let focusBlurs = [];

		shortcut.register(navigation.commands);

		this.focus = new Command({
			source: 'navigation.view',
			execute: e => {
				const { rowIndex, columnIndex, behavior } = e;
				const td = table.body.cell(rowIndex, columnIndex).model();
				if (td) {
					const { row, column } = td;
					model.navigation({
						cell: {
							rowIndex,
							columnIndex,
							row,
							column
						}
					}, {
							source: 'navigation.view',
							behavior
						});
				} else {
					model.navigation({
						cell: null
					}, {
							source: 'navigation.view',
							behavior
						});
				}
			},
			canExecute: newCell => {
				const oldCell = model.navigation().cell;
				if (newCell && newCell.column.canFocus && !Td.equals(newCell, oldCell)) {
					if (this.model.edit().mode !== 'cell') {
						switch (this.model.selection().unit) {
							case 'row':
							case 'column': {
								// Focus cell only if it was focused previously by keyboard
								if (!oldCell) {
									return false;
								}
								break;
							}
						}
					}

					return true;
				}

				return false;
			}
		});

		this.scrollTo = new Command({
			source: 'navigation.view',
			execute: (row, column) => {
				const cell = table.body.cell(row, column);
				this.scroll(table.view, cell);
			},
			canExecute: (row, column) => table.body.cell(row, column).model() !== null
		});

		model.navigationChanged.watch(e => {
			if (e.hasChanges('cell')) {
				if (e.tag.behavior !== 'core') {
					// We need this one to toggle focus from details to main grid
					// or when user change navigation cell through the model
					if (!this.table.view.isFocused()) {
						this.table.view.focus();
					}
				}

				const { rowIndex, columnIndex } = e.state;
				focusBlurs = this.invalidateFocus(focusBlurs);
				if (e.tag.source !== 'navigation.scroll' && this.scrollTo.canExecute(rowIndex, columnIndex)) {
					this.scrollTo.execute(rowIndex, columnIndex);
				}

				model.focus({
					rowIndex,
					columnIndex
				}, {
						source: 'navigation.view'
					});
			}
		});

		model.focusChanged.watch(e => {
			if (e.tag.source === 'navigation.view') {
				return;
			}

			if (e.hasChanges('isActive')) {
				const { view } = table;
				const activeClassName = `${GRID_PREFIX}-active`;
				if (e.state.isActive) {
					Fastdom.mutate(() => view.addClass(activeClassName));
					view.focus();
				} else {
					Fastdom.mutate(() => view.removeClass(activeClassName));
				}
			}

			if (e.hasChanges('rowIndex') || e.hasChanges('columnIndex')) {
				this.focus.execute(e.state);
			}

		});

		model.sceneChanged.watch(e => {
			if (e.hasChanges('status')) {
				const { status } = e.state;
				switch (status) {
					case 'stop':
						const { row, column, columnIndex, rowIndex } = model.navigation();
						if (row && column) {
							const newRowIndex = table.data.rows().indexOf(row);
							let newColumnIndex = table.data.columns().findIndex(c => c.key === column.key);
							if (newColumnIndex < 0 && column.class === 'control') {
								newColumnIndex = columnIndex;
							}

							this.focus.execute({
								rowIndex: newRowIndex,
								columnIndex: newColumnIndex,
								behavior: 'core'
							});
						}
						break;
				}
			}
		});
	}

	invalidateFocus(dispose) {
		dispose.forEach(f => f());
		dispose = [];

		const { rowIndex, columnIndex } = this.model.navigation();
		const cell = this.table.body.cell(rowIndex, columnIndex);
		if (cell.model()) {
			Fastdom.mutate(() => cell.addClass(`${GRID_PREFIX}-focused`));
			dispose.push(() => Fastdom.mutate(() => cell.removeClass(`${GRID_PREFIX}-focused`)));
		}

		return dispose;
	}

	scroll(view, target) {
		const { scroll } = this.model;
		Fastdom.measure(() => {
			const tr = target.rect();
			const vr = view.rect();
			const state = {};

			if (view.canScrollTo(target, 'left')) {
				if (vr.left > tr.left
					|| vr.left > tr.right
					|| vr.right < tr.left
					|| vr.right < tr.right) {

					if (vr.width < tr.width || vr.left > tr.left || vr.left > tr.right) {
						state.left = tr.left - vr.left + scroll().left;
					}
					else if (vr.left < tr.left || vr.right < tr.right) {
						state.left = tr.right - vr.right + scroll().left;
					}
				}
			}

			if (view.canScrollTo(target, 'top')) {
				if (vr.top > tr.top
					|| vr.top > tr.bottom
					|| vr.bottom < tr.top
					|| vr.bottom < tr.bottom) {

					if (vr.height < tr.height || vr.top > tr.top || vr.top > tr.bottom) {
						state.top = tr.top - vr.top + scroll().top;
					}
					else if (vr.top < tr.top || vr.bottom < tr.bottom) {
						state.top = tr.bottom - vr.bottom + scroll().top;
					}
				}
			}

			if (Object.keys(state).length) {
				scroll(state, { behavior: 'core', source: 'navigation.view' });
			}
		});
	}
}