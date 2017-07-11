import {CommandManager} from './command.manager';

export class TableCommandManager extends CommandManager {
	constructor(apply, table) {
		super(apply);

		this.table = table;
	}

	filter(commands) {
		if (this.table.view.isFocused()) {
			return super.filter(commands);
		}

		return [];
	}
}
