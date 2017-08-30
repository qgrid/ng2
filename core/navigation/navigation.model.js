export class NavigationModel {
	constructor() {
		this.cell = null;
		this.shortcut = {
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right',
			next: 'tab',
			previous: 'shift+tab',
			home: 'home',
			end: 'end',
			pageUp: 'pageUp',
			pageDown: 'pageDown',
		};
	}

	get rowIndex() {
		return this.cell ? this.cell.rowIndex : -1;
	}

	get columnIndex() {
		return this.cell ? this.cell.columnIndex : -1;
	}

	get row() {
		return this.cell ? this.cell.row : null;
	}

	get column() {
		return this.column ? this.cell.column : null;
	}
}