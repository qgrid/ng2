import {PluginView} from '../plugin.view';
import {isUndefined} from '@grid/core/utility';
import {Command} from '@grid/core/command';
import {RowEditor} from '@grid/core/edit/edit.row.editor';
import {Event} from '@grid/core/infrastructure';

export class EditFormPanelView extends PluginView {
	constructor(model, context) {
		super(model);
		
		this.shortcutOff = null;
		this.editor = new RowEditor(context.row, model.data().columns);
		
		this.submitEvent = new Event();
		this.cancelEvent = new Event();
		this.resetEvent = new Event();

		this.submit = this.commands.submit;
		this.cancel = this.commands.cancel;
		this.reset = this.commands.reset;

		if (!isUndefined(context.shortcut)) {
			this.shortcutOff = context.shortcut.register(new Map(
				Object.entries(this.commands)
			));
		}
		
	}

	get commands() {
		const commands = {
			submit: new Command({
				source: 'edit.form.panel',
				shortcut: this.shortcutFactory('commit'),
				execute: () => {
					this.editor.commit();
					this.submitEvent.emit();
				}
			}),
			cancel: new Command({
				source: 'edit.form.panel',
				shortcut: this.shortcutFactory('cancel'),
				execute: () => this.cancelEvent.emit()
			}),
			reset: new Command({
				source: 'edit.form.panel',
				execute: () => {
					this.editor.editors.forEach(e => e.reset());
					this.resetEvent.emit();
				}
			})
		};

		return commands;
	}

	shortcutFactory(type) {
		const edit = this.model.edit;
		return () => {
			const shortcuts = edit()[type + 'Shortcuts'];
			return shortcuts['form'] || shortcuts['$default'];
		};
	}
}
