import { noop } from '../utility/kit';
import { Command } from '../command/command';

export class StyleState {
	constructor() {
		this.row = noop;
		this.cell = noop;

		this.rows = [];
		this.cells = [];
		this.classList = [];

		this.invalidate = new Command({
			source: 'style.model',
			canExecute: context => context.model.edit().status === 'view'
		});
	}
}