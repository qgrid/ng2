import {PluginView} from '../plugin.view';
import {Command} from '@grid/core/command';
import {Event} from '@grid/core/infrastructure';

export class EditFormView extends PluginView {
	constructor(model, context) {
		super(model);

		this.key = context.key;
		this.title = context.title;
		this.row = context.row;

		this.submitEvent = new Event();
		this.cancelEvent = new Event();

		this.submit = this.commands.submit;
		this.cancel = this.commands.cancel;
	}

	get commands() {
		const commands = {
			submit: new Command({
				source: 'edit.form',
				execute: () => this.submitEvent.emit()
			}),
			cancel: new Command({
				source: 'edit.form',
				execute: () => this.cancelEvent.emit()
			})
		};

		return commands;
	}
}