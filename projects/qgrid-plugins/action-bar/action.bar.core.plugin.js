export class ActionBarCorePlugin {
	constructor(model, disposable) {
		this.model = model;

		const { shortcut, manager } = this.model.action();
		disposable.add(this.model.actionChanged.watch(e => {
			if (e.hasChanges('items')) {
				disposable.finalize();

				const commands = e.state.items.map(act => act.command);
				disposable.add(shortcut.register(manager, commands));
			}
		}));
	}

	get actions() {
		return this.model.action().items;
	}
}
