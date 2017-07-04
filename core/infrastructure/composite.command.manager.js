export class CompositeCommandManager {
	constructor(manager) {
		this.manager = manager;
	}

	keyDown(f) {
		return this.manager.keyDown(f);
	}

	canExecute() {
		return this.manager.canExecute();
	}

	execute(commands) {
		return this.manager.execute(commands);
	}
}