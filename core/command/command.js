import {yes} from '../utility/index';

export class Command {
	constructor(context = {}) {
		this.execute = yes;
		this.canExecute = yes;
		this.shortcut = '';
		this.priority = 0;
		this.source = '';
		
		Object.assign(this, context);
	}

	clone(context = {}) {
		const cmd = new Command(this);
		Object.assign(cmd, context);
		return cmd;
	}
}