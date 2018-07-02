export class CompositeCommandManager {
	constructor(manager) {
		this.manager = manager;
	}

	filter(commands) {
		return this.manager.filter(commands);
	}

	invoke(commands) {
		return this.manager.invoke(commands);
	}
}