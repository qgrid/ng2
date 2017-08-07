import {Command} from '../command';

export class Navigation {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	positon(y, direction) {
		const body = this.table.body;
		let index = 0;
		let offset = 0;
		const lastRow = this.lastRow;

		// TODO: improve performance
		while (index <= lastRow && offset <= y) {
			offset += body.row(index).height();
			index++;
		}

		if (direction === 'down' && body.row(index)) {
			offset -= body.row(index).height();
			index--;
		}

		return {
			row: Math.max(this.firstRow, Math.min(lastRow, index)),
			offset: offset
		};
	}

	goTo(row, column, source = 'navigation') {
		let cell = this.cell(row, column);
		if (!cell) {
			// TODO: make it better, right it just a huck for row-details,
			// need to support rowspan and colspan
			cell = this.cell(row, this.firstColumn);
		}

		this.model.navigation({cell: cell}, {source: source});
	}

	get columns() {
		const columns = this.table.data.columns();
		const indicies = [];
		for (let i = 0, length = columns.length; i < length; i++) {
			const column = columns[i];
			if (column.canFocus) {
				indicies.push(i);
			}
		}
		return indicies;
	}

	get currentColumn() {
		const columns = this.columns;
		if (!columns.length) {
			return -1;
		}

		const column = this.model.navigation().columnIndex;
		const index = columns.indexOf(column);
		return columns[Math.max(0, index)];
	}

	get nextColumn() {
		const columns = this.columns;
		if (!columns.length) {
			return -1;
		}

		const column = this.model.navigation().columnIndex;
		const index = columns.indexOf(column);
		return index < columns.length - 1 ? columns[index + 1] : -1;
	}

	get prevColumn() {
		const columns = this.columns;
		if (!columns.length) {
			return -1;
		}

		const column = this.model.navigation().columnIndex;
		const index = columns.indexOf(column);
		return index > 0 ? columns[index - 1] : -1;
	}

	get lastColumn() {
		const columns = this.columns;
		if (!columns.length) {
			return -1;
		}

		return columns[columns.length - 1];
	}

	get firstColumn() {
		const columns = this.columns;
		if (!columns.length) {
			return -1;
		}

		return columns[0];
	}

	get currentRow() {
		return this.model.navigation().rowIndex;
	}

	get nextRow() {
		const row = this.model.navigation().rowIndex + 1;
		return row <= this.lastRow ? row : -1;
	}

	get prevRow() {
		const row = this.model.navigation().rowIndex - 1;
		return row >= 0 ? row : -1;
	}

	get firstRow() {
		return 0;
	}

	get lastRow() {
		return this.table.body.rowCount() - 1;
	}

	cell(row, column) {
		return this.table.body.cell(row, column).model;
	}

	get commands() {
		const model = this.model;
		const table = this.table;
		const shortcut = model.navigation().shortcut;
		const inViewState = () => model.edit().state === 'view';

		const commands = {
			goDown: new Command({
				shortcut: shortcut.down,
				canExecute: () => inViewState() && this.nextRow >= 0,
				execute: () => this.goTo(this.nextRow, this.currentColumn)
			}),
			goUp: new Command({
				shortcut: shortcut.up,
				canExecute: () => inViewState() && this.prevRow >= 0,
				execute: () => this.goTo(this.prevRow, this.currentColumn)
			}),
			goRight: new Command({
				shortcut: shortcut.right,
				canExecute: () => inViewState() && this.nextColumn >= 0,
				execute: () => this.goTo(this.currentRow, this.nextColumn)
			}),
			goLeft: new Command({
				shortcut: shortcut.left,
				canExecute: () => inViewState() && this.prevColumn >= 0,
				execute: () => this.goTo(this.currentRow, this.prevColumn)
			}),
			goNext: new Command({
				shortcut: shortcut.next,
				canExecute: () => {
					const hasNextColumn = this.nextColumn >= 0;
					const hasNextRow = this.nextRow >= 0;
					return hasNextColumn || hasNextRow;
				},
				execute: () => {
					const hasNextColumn = this.nextColumn >= 0;
					if (!hasNextColumn) {
						this.goTo(this.nextRow, this.firstColumn);
						return;
					}

					this.goTo(this.currentRow, this.nextColumn);
				}
			}),
			goPrevious: new Command({
				shortcut: shortcut.previous,
				canExecute: () => {
					const hasPrevColumn = this.prevColumn >= 0;
					const hasPrevRow = this.prevRow >= 0;
					return hasPrevColumn || hasPrevRow;
				},
				execute: () => {
					const hasPrevColumn = this.prevColumn >= 0;
					if (!hasPrevColumn) {
						this.goTo(this.prevRow, this.lastColumn);
						return;
					}

					this.goTo(this.currentRow, this.prevColumn);
				}
			}),
			home: new Command({
				shortcut: shortcut.home,
				canExecute: () => inViewState() && this.prevRow >= 0,
				execute: () => this.goTo(this.firstRow, this.currentColumn)
			}),
			end: new Command({
				shortcut: shortcut.end,
				canExecute: () => inViewState() && this.nextRow >= 0,
				execute: () => this.goTo(this.lastRow, this.currentColumn)
			}),
			pageUp: new Command({
				shortcut: shortcut.pageUp,
				canExecute: () => inViewState() && this.prevRow >= 0,
				execute: () => {
					const view = table.view;
					const position = this.positon(view.scrollTop() - view.height(), 'up');
					view.scrollTop(position.offset);
					this.goTo(position.row, this.currentColumn, 'navigation.scroll');
				}
			}),
			pageDown: new Command({
				shortcut: shortcut.pageDown,
				canExecute: () => inViewState() && this.nextRow >= 0,
				execute: () => {
					const view = table.view;
					let position = this.positon(view.scrollTop() + view.height(), 'down');
					view.scrollTop(position.offset);
					this.goTo(position.row, this.currentColumn, 'navigation.scroll');
				}
			})
		};

		return new Map(Object.entries(commands));
	}
}