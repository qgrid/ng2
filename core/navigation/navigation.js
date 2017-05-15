import {Command} from '../infrastructure';

export class Navigation {
	constructor(model, table) {
		this.model = model;
		this.table = table;
	}

	positon(y, direction) {
		const body = this.table.body;
		let index = 0;
		let offset = 0;
		const count = body.rowCount();

		// TODO: improve performance
		while (index < count && offset <= y) {
			offset += body.row(index).height;
			index++;
		}

		if (direction === 'down' && body.row(index)) {
			offset -= body.row(index).height;
			index--;
		}
		return {
			row: Math.max(this.firstRow, Math.min(this.lastRow, index)),
			offset: offset
		};
	}

	goTo(row, column, source = 'navigation') {
		const cell = this.cell(row, column);
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

	get rows() {
		return this.table.data.rows().map((r, i) => i);
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
		const rows = this.rows;
		if (!rows.length) {
			return -1;
		}

		const row = this.model.navigation().rowIndex;
		return rows[Math.max(0, row)];
	}

	get nextRow() {
		const rows = this.rows;
		if (!rows.length) {
			return -1;
		}

		const row = this.model.navigation().rowIndex;
		return row < rows.length - 1 ? rows[row + 1] : -1;
	}

	get prevRow() {
		const rows = this.rows;
		if (!rows.length) {
			return -1;
		}

		const row = this.model.navigation().rowIndex;
		return row > 0 ? rows[row - 1] : -1;
	}

	get firstRow() {
		const rows = this.rows;
		if (!rows.length) {
			return -1;
		}

		return rows[0];
	}

	get lastRow() {
		const rows = this.rows;
		if (!rows.length) {
			return -1;
		}

		return rows[rows.length - 1];
	}

	cell(row, column) {
		return this.table.body.cell(row, column).model;
	}

	get commands() {
		const model = this.model;
		const table = this.table;
		const canExecute = () => model.edit().state === 'view';

		const commands = {
			goDown: new Command({
				shortcut: 'down',
				canExecute: () => canExecute() && this.nextRow >= 0,
				execute: () => this.goTo(this.nextRow, this.currentColumn)
			}),
			goUp: new Command({
				shortcut: 'up',
				canExecute: () => canExecute() && this.prevRow >= 0,
				execute: () => this.goTo(this.prevRow, this.currentColumn)
			}),
			goRight: new Command({
				shortcut: 'right',
				canExecute: () => canExecute() && this.nextColumn >= 0,
				execute: () => this.goTo(this.currentRow, this.nextColumn)
			}),
			tab: new Command({
				shortcut: 'tab',
				execute: () => {
					const hasNextColumn = this.nextColumn >= 0;
					const hasNextRow = this.nextRow >= 0;
					if (!hasNextColumn && !hasNextRow) {
						table.blur();
						return;
					}

					if (!hasNextColumn) {
						this.goTo(this.nextRow, this.firstColumn);
						return;
					}

					this.goTo(this.currentRow, this.nextColumn);
				}
			}),
			shiftTab: new Command({
				shortcut: 'Shift+tab',
				execute: () => {
					const hasPrevColumn = this.prevColumn >= 0;
					const hasPrevRow = this.prevRow >= 0;
					if (!hasPrevColumn && !hasPrevRow) {
						table.blur();
						return;
					}

					if (!hasPrevColumn) {
						this.goTo(this.prevRow, this.lastColumn);
						return;
					}

					this.goTo(this.currentRow, this.prevColumn);
				}
			}),
			goLeft: new Command({
				shortcut: 'left',
				canExecute: () => canExecute() && this.prevColumn >= 0,
				execute: () => this.goTo(this.currentRow, this.prevColumn)
			}),
			home: new Command({
				shortcut: 'home',
				canExecute: () => canExecute() && this.prevRow >= 0,
				execute: () => this.goTo(this.firstRow, this.currentColumn)
			}),
			end: new Command({
				shortcut: 'end',
				canExecute: () => canExecute() && this.nextRow >= 0,
				execute: () => this.goTo(this.lastRow, this.currentColumn)
			}),
			pageUp: new Command({
				shortcut: 'pageUp',
				canExecute: () => canExecute() && this.prevRow >= 0,
				execute: () => {
					const body = table.body;
					const position = this.positon(body.scrollTop() - body.rect().height, 'up');
					body.scrollTop(position.offset);
					this.goTo(position.row, this.currentColumn, 'navigation.scroll');
				}
			}),
			pageDown: new Command({
				shortcut: 'pageDown',
				canExecute: () => canExecute() && this.nextRow >= 0,
				execute: () => {
					const body = table.body;
					let position = this.positon(body.scrollTop() + body.rect().height, 'down');
					body.scrollTop(position.offset);
					this.goTo(position.row, this.currentColumn, 'navigation.scroll');
				}
			})
		};

		return new Map(Object.entries(commands));
	}
}