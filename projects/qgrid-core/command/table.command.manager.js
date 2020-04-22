import {CommandManager} from './command.manager';

export class TableCommandManager extends CommandManager {
	constructor(apply, table) {
		super(apply);

		this.table = table;
	}

	filter(commands, source) {
		if (source === 'editor' || this.isViewActive()) {
			return super.filter(commands, source);
		}

		return [];
	}

	isViewActive() {
		return this.table.view.isFocused();
	}
}