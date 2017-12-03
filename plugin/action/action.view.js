import {PluginView} from '../plugin.view';
import {Action} from '@grid/core/action';

export class ActionView extends PluginView {
	constructor(model, context) {
		super(...arguments);

		this.command = context.command;

		const action = new Action(context.command, context.title, context.icon);
		action.id = context.id;

		const actions = Array.from(model.action().items);
		actions.push(action);

		model.action({
			items: actions
		});
	}

	execute() {
		return this.command && this.command.execute();
	}

	canExecute() {
		return this.command && this.command.canExecute();
	}
}