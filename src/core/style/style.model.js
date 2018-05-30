import {noop} from '../utility/kit';
import {Command} from '../command/command';

export class StyleModel {
	constructor() {
		this.row = noop;
		this.cell = noop;
		this.rows = [];
		this.cells = [];

		this.invalidate = new Command({
			source: 'style.model',
			canExecute: context => context.model.edit().state === 'view'
		});
	}
}