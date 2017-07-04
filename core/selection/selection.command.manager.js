import {CompositeCommandManager} from '../infrastructure';

export class SelectionCommandManager extends CompositeCommandManager {
	constructor(model, manager) {
		super(manager);

		this.model = model;
	}

	canExecute() {
		return this.model.edit().state !== 'edit'
			&& super.canExecute();
	}
}