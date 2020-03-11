import { Disposable } from '../../core/infrastructure/disposable';

export class ActionBarCoreView extends Disposable {
	constructor(model) {
		super();
		this.model = model;

		const { shortcut, manager } = this.model.action();
		this.using(this.model.actionChanged.watch(e => {
			if (e.hasChanges('items')) {
				this.dispose();

				const commands = e.state.items.map(act => act.command);
				this.using(shortcut.register(manager, commands));
			}
		}));
	}

	get actions() {
		return this.model.action().items;
	}
}
