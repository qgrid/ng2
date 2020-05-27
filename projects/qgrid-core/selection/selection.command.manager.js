import { CompositeCommandManager } from '../command/composite.command.manager';

export class SelectionCommandManager extends CompositeCommandManager {
	constructor(model, manager) {
		super(manager);

		this.model = model;
	}

	filter(commands) {
		if (this.model.edit().status === 'edit') {
			const { cell } = this.model.navigation();
			if (cell && cell.column.type !== 'select') {
				return [];
			}
		}

		return super.filter(commands);
	}
}
