import {CommandManager} from './command.manager';

export class TableCommandManager extends CommandManager {
	constructor(apply, table) {
		super(apply);

		this.table = table;
	}

	keyDown(f) {
		return this.table.view.keyDown(f);
	}
	
	canExecute() {
		return this.table.view.isFocused();
	}
}