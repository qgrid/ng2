import { Command } from '../command/command';

export class NavigationModel {
	constructor() {
		this.cell = null;

		this.debounce = 100;

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
			upward: 'shift+pageUp',
			downward: 'shift+pageDown'
		};

		this.go = new Command({ source: 'navigation.model' });

		this.prevent = new Set([
			'space',
			'shift+space',
			'up',
			'down',
			'left',
			'right',
			'tab',
			'shift+tab',
			'home',
			'end',
			'pageUp',
			'pageDown',
			'shift+pageDown',
			'shift+pageUp'
		]);
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
		return this.cell ? this.cell.column : null;
	}
}