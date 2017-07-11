import {yes} from '../utility';

export class Command {
	constructor(context = {}) {
		this.execute = context.execute || yes;
		this.canExecute = context.canExecute || yes;
		this.shortcut = context.shortcut;
	}
}