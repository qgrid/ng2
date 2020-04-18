export class ActionCorePlugin {
	constructor(model) {
		this.model = model;
	}

	execute(e) {
		const model = this.model;
		return model && model.command && model.command.execute(e);
	}

	canExecute(e) {
		const model = this.model;
		return model && model.command && model.command.canExecute(e);
	}

	get shortcut() {
		const model = this.model;
		if (model && model.command) {
			return model.command.shortcut;
		}
	}

	get title() {
		const model = this.model;
		if (model) {
			return model.title;
		}
	}

	get icon() {
		const model = this.model;
		if (model) {
			return model.icon;
		}
	}
}