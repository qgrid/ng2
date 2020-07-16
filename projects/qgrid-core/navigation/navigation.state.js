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
			pageUp: 'pageup',
			pageDown: 'pagedown',
			upward: 'ctrl+home',
			downward: 'ctrl+end'
		};

		this.go = new Command();

		this.prevent = new Set([
			'space',
			'up',
			'down',
			'left',
			'right',
			'tab',
			'home',
			'end',
			'pageup',
			'pagedown',
		]);
	}
}
