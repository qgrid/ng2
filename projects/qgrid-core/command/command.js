import { yes, no } from '../utility/kit';
import { SubjectLike } from '../rx/rx';
import { generateCommandKey } from './command.key';

export class Command {
	constructor(context = {}) {
		this.key = context.key || generateCommandKey();
		this.priority = context.priority || 0;

		this.execute = context.execute || no;
		this.canExecute = context.canExecute || yes;
		this.canExecuteCheck = new SubjectLike();

		this.shortcut = context.shortcut || '';
	}
}

export function prob(cmd, arg) {
	if (cmd.canExecute(arg) === true) {
		cmd.execute(arg);
		return true;
	}

	return false;
}
