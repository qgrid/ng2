import { Command } from '../command/command';

export class NavigationState {
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
}
