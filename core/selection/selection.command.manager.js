import {CompositeCommandManager} from '../command';

export class SelectionCommandManager extends CompositeCommandManager {
	constructor(model, manager) {
		super(manager);

		this.model = model;
	}

	filter(commands) {
		if (this.model.edit().state !== 'edit') {
			return super.filter(commands);
		}

		return [];
	}
}
