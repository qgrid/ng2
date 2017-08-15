import {CommandManager} from './command.manager';

export class TableCommandManager extends CommandManager {
	constructor(apply, table) {
		super(apply);

		this.table = table;
	}

	filter(commands) {
		if (this.isViewActive()) {
			return super.filter(commands);
		}

		return [];
	}

	isViewActive() {
		return this.table.view.isFocused();
	}
}