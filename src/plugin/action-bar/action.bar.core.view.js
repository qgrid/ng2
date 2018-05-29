import { Disposable } from '../../core/infrastructure/disposable';

export class ActionBarCoreView extends Disposable {
	constructor(model) {
		this.model = model;

		const { shortcut, manager } = this.model.action();
		const commandManager = actionState.manager;
		this.model.actionChanged.watch(e => {
			if (e.hasChanges('items')) {
				this.dispose();
				
				const commands = e.state.items.map(act => act.command);
				this.using(shortcut.register(manager, commands));
			}
		});
	}

	get actions() {
		return this.model.action().items;
	}
}