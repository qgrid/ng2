import { Command } from '@qgrid/core/command';
import { Event } from '@qgrid/core/infrastructure';

export class EditFormPlugin {
	constructor(model, context) {
		this.model = model;

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