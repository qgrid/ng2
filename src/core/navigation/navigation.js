import { Command } from '../command/command';

export class Navigation {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	positon(y, direction) {
		const table = this.table;
		const body = table.body;
		const lastRow = this.lastRow;
		const lower = table.view.scrollHeight() - table.view.height(); 

		let index = 0;
		let offset = 0;

		// TODO: improve performance
		while (index <= lastRow && offset <= y) {
			offset += body.row(index).height();
			index++;
		}

		if (direction === 'down' && body.row(index)) {
			offset -= body.row(index).height();
			index--;
		}

		const row = Math.max(this.firstRow, Math.min(lastRow, index));
		offset = Math.min(offset, lower);
		return { row, offset };
	}

	goTo(row, column, source = 'navigation') {
		let cell = this.cell(row, column);
		if (!cell) {
			// TODO: make it better, right it just a huck for row-details,
			// need to support rowspan and colspan
			cell = this.cell(row, this.firstColumn);
		}

		this.model.navigation({ cell }, { source });
		return true;
	}

	columns(rowIndex) {
		const columns = this.table.body.columns(rowIndex);
		const index = [];
		for (let i = 0, length = columns.length; i < length; i++) {
			const column = columns[i];
			if (column.model().canFocus) {
				index.push(column.index);
			}
		}
		return index;
	}

	get currentColumn() {
		const columns = this.columns(this.currentRow);
		const columnIndex = this.model.navigation().columnIndex;
		const index = columns.indexOf(columnIndex);
		return columns.length ? columns[Math.max(index, 0)] : -1;
	}

	get nextColumn() {
		const columns = this.columns(this.currentRow);
		const index = columns.indexOf(this.currentColumn);
		return index >= 0 && index < columns.length - 1 ? columns[index + 1] : -1;
	}

	get prevColumn() {
		const columns = this.columns(this.currentRow);
		const index = columns.indexOf(this.currentColumn);
		return index > 0 && index < columns.length ? columns[index - 1] : -1;
	}

	get lastColumn() {
		const columns = this.columns(this.currentRow);
		const index = columns.length - 1;
		return index >= 0 ? columns[index] : -1;
	}

	get firstColumn() {
		const columns = this.columns(this.currentRow);
		return columns.length ? columns[0] : -1;
	}

	get currentRow() {
		const index = this.model.navigation().rowIndex;
		if (index < 0) {
			return this.model.scene().rows.length ? 0 : -1;
		}

		return index;
	}

	get nextRow() {
		const row = this.currentRow + 1;
		return row <= this.lastRow ? row : -1;
	}

	get prevRow() {
		const row = this.currentRow - 1;
		return row >= 0 ? row : -1;
	}

	get firstRow() {
		return Math.min(0, this.lastRow);
	}

	get lastRow() {
		return this.table.body.rowCount(this.currentColumn) - 1;
	}

	cell(row, column) {
		const cell = this.table.body.cell(row, column);
		return cell.model();
	}

	context(type, settings) {
		const model = this.model;
		const oldRow = this.currentRow;
		const oldColumn = this.currentColumn;
		const keyCode = model.action().shortcut.keyCode;

		return Object.assign({
			model,
			type,
			oldRow,
			oldColumn,
			keyCode
		}, settings);
	}

	get commands() {
		const model = this.model;
		const table = this.table;
		const shortcut = model.navigation().shortcut;
		const edit = model.edit;

		const canNavigate = () => {
			if (edit().state === 'view') {
				return true;
			}

			const column = table.body.column(this.currentColumn).model();
			return column && (column.editorOptions.trigger === 'focus' || column.editorOptions.cruise === 'transparent');
		};

		const go = this.model.navigation().go;

		const commands = {
			goDown: new Command({
				source: 'navigation',
				shortcut: shortcut.down,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.nextRow;
						return newRow >= 0 && go.canExecute(this.context('down', { newRow }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.nextRow;
					const newColumn = this.currentColumn;
					return go.execute(this.context('down', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goUp: new Command({
				source: 'navigation',
				shortcut: shortcut.up,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.prevRow;
						return newRow >= 0 && go.canExecute(this.context('up', { newRow }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.prevRow;
					const newColumn = this.currentColumn;
					return go.execute(this.context('up', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goRight: new Command({
				source: 'navigation',
				shortcut: shortcut.right,
				canExecute: () => {
					if (canNavigate()) {
						const newColumn = this.nextColumn;
						return newColumn >= 0 && go.canExecute(this.context('right', { newColumn }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.currentRow;
					const newColumn = this.nextColumn;
					return go.execute(this.context('right', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goLeft: new Command({
				source: 'navigation',
				shortcut: shortcut.left,
				canExecute: () => {
					if (canNavigate()) {
						const newColumn = this.prevColumn;
						return newColumn >= 0 && go.canExecute(this.context('left', { newColumn }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.currentRow;
					const newColumn = this.prevColumn;
					return go.execute(this.context('left', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goNext: new Command({
				source: 'navigation',
				shortcut: shortcut.next,
				canExecute: () => {
					const newRow = this.nextRow;
					const newColumn = this.nextColumn;
					const hasNextColumn = newColumn >= 0;
					const hasNextRow = newRow >= 0;
					return (hasNextColumn || hasNextRow) && go.canExecute(this.context('next', { newRow, newColumn }));
				},
				execute: () => {
					const nextColumn = this.nextColumn;
					const hasNextColumn = nextColumn >= 0;
					const newRow = hasNextColumn ? this.currentRow : this.nextRow;
					const newColumn = hasNextColumn ? nextColumn : this.firstColumn;

					return go.execute(this.context('next', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			goPrevious: new Command({
				source: 'navigation',
				shortcut: shortcut.previous,
				canExecute: () => {
					const newColumn = this.prevColumn;
					const newRow = this.prevRow;
					const hasPrevColumn = newColumn >= 0;
					const hasPrevRow = newRow >= 0;
					return (hasPrevColumn || hasPrevRow) && go.canExecute(this.context('previous', { newRow, newColumn }));
				},
				execute: () => {
					const prevColumn = this.prevColumn;
					const hasPrevColumn = prevColumn >= 0;
					const newColumn = hasPrevColumn ? prevColumn : this.lastColumn;
					const newRow = hasPrevColumn ? this.currentRow : this.prevRow;
					return go.execute(this.context('previous', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			home: new Command({
				source: 'navigation',
				shortcut: shortcut.home,
				canExecute: () => {
					if (canNavigate()) {
						const newColumn = this.prevColumn;
						return newColumn >= 0 && go.canExecute(this.context('end', { newColumn }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.currentRow;
					const newColumn = this.firstColumn;
					return go.execute(this.context('home', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			end: new Command({
				source: 'navigation',
				shortcut: shortcut.end,
				canExecute: () => {
					if (canNavigate()) {
						const newColumn = this.nextColumn;
						return newColumn >= 0 && go.canExecute(this.context('home', { newColumn }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.currentRow;
					const newColumn = this.lastColumn;
					return go.execute(this.context('end', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			upward: new Command({
				source: 'navigation',
				shortcut: shortcut.upward,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.prevRow;
						return newRow >= 0 && go.canExecute(this.context('upward', { newRow }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.firstRow;
					const newColumn = this.currentColumn;
					return go.execute(this.context('upward', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			downward: new Command({
				source: 'navigation',
				shortcut: shortcut.downward,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.nextRow;
						return newRow >= 0 && go.canExecute(this.context('downward', { newRow }));
					}

					return false;
				},
				execute: () => {
					const newRow = this.lastRow;
					const newColumn = this.currentColumn;
					return go.execute(this.context('downward', { newRow, newColumn })) && this.goTo(newRow, newColumn);
				}
			}),
			pageUp: new Command({
				source: 'navigation',
				shortcut: shortcut.pageUp,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.prevRow;
						return newRow >= 0 && go.canExecute(this.context('pageUp', { newRow }));
					}

					return false;
				},
				execute: () => {
					const view = table.view;
					const position = this.positon(view.scrollTop() - view.height(), 'up');
					const newRow = position.row;
					const newColumn = this.currentColumn;
					if (go.execute(this.context('pageUp', { newRow, newColumn }))) {
						this.model.scroll({ top: position.offset });
						return this.goTo(newRow, newColumn, 'navigation.scroll');
					}

					return false;
				}
			}),
			pageDown: new Command({
				source: 'navigation',
				shortcut: shortcut.pageDown,
				canExecute: () => {
					if (canNavigate()) {
						const newRow = this.nextRow;
						return newRow >= 0 && go.canExecute(this.context('pageDown', { newRow }));
					}

					return false;
				},
				execute: () => {
					const view = table.view;
					const position = this.positon(view.scrollTop() + view.height(), 'down');
					const newRow = position.row;
					const newColumn = this.currentColumn;
					if (go.execute(this.context('pageDown', { newRow, newColumn }))) {
						this.model.scroll({ top: position.offset });
						return this.goTo(position.row, this.currentColumn, 'navigation.scroll');
					}

					return false;
				}
			})
		};

		return new Map(Object.entries(commands));
	}
}