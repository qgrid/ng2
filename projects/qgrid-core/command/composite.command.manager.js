export class CompositeCommandManager {
	constructor(manager) {
		this.manager = manager;
	}

	filter(commands) {
		return this.manager.filter(commands);
	}

	invoke(commands, context, source) {
		return this.manager.invoke(commands, context, source);
	}
}