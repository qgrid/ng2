import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Action } from '@qgrid/core/action/action';
import { Command } from '@qgrid/core/command/command';
import { TemplateHostService, Disposable, GridError, GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-action',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		GridPlugin,
		TemplateHostService,
		Disposable
	]
})
export class ActionComponent implements OnInit {
	@Input() id: string = null;
	@Input() title: string = null;
	@Input() icon: string = null;
	@Input() command: Command = null;

	constructor(
		private plugin: GridPlugin,
		private disposable: Disposable,
		templateHost: TemplateHostService
	) {
		templateHost.key = source => `action-${source}-${this.id}.tpl.html`;
	}

	execute() {
		return this.command && this.command.execute();
	}

	canExecute() {
		return this.command && this.command.canExecute();
	}

	ngOnInit() {
		const { model } = this.plugin;
		const hasCommand = !!this.command;
		const command = this.command || new Command();
		if (!(hasCommand || this.id)) {
			throw new GridError('action.component', '`Command` or `id` is missed');
		}

		const action = new Action(command, this.title, this.icon);
		action.id = this.id;
		if (!hasCommand) {
			action.templateUrl = `action-trigger-${this.id}.tpl.html`;
		}

		const actions = Array.from(model.action().items);
		actions.push(action);

		model.action({ items: actions }, { source: 'action.component' });

		this.disposable.add(() => {
			const { items } = model.action();
			const index = items.indexOf(action);
			if (index >= 0) {
				const newItems = Array.from(items);
				newItems.splice(index, 1);
				model.action({ items: newItems });
			}
		});
	}
}
