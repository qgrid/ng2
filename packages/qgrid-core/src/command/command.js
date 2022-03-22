import { SubjectLike } from '../rx/rx';
import { yes } from '../utility/kit';

export class Command {
	constructor(context = {}) {
		this.execute = yes;
		this.canExecute = yes;
		this.canExecuteCheck = new SubjectLike();

		this.shortcut = '';
		this.priority = -1;
		this.source = '';
		this.sink = null;

		Object.assign(this, context);
	}

	clone(context = {}) {
		const cmd = new Command(this);
		Object.assign(cmd, context);
		return cmd;
	}
}