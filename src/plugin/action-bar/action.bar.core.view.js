import {PluginView} from '../plugin.view';

export class ActionBarCoreView extends PluginView {
	constructor(model) {
		super(model);

		this.shortcutOff = null;

		const actionState = this.model.action();
		const shortcut = actionState.shortcut;
		const commandManager = actionState.manager; 
		this.using(this.model.actionChanged.watch(e => {
			if (e.hasChanges('items')) {
				if (this.shortcutOff) {
					this.shortcutOff();
					this.shortcutOff = null;
				}

				const commands = e.state.items.map(act => act.command);
				this.shortcutOff = shortcut.register(commandManager, commands);
			}
		}));
	}

	get actions() {
		return this.model.action().items;
	}
}