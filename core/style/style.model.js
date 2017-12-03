import {noop} from '../utility';
import {Command} from '../command/command';

export class StyleModel {
	constructor() {
		this.row = noop;
		this.cell = noop;
		this.invalidate = new Command({
			source: 'style.model',
			canExecute: context => context.model.edit().state === 'view'
		});
	}
}