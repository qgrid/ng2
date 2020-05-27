import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Action } from '@qgrid/core/action/action';
import { Command } from '@qgrid/core/command/command';
import { TemplateHostService, GridError, GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-action',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		GridPlugin,
		TemplateHostService
	]
})
export class ActionComponent implements OnInit {
	@Input() id: string;
	@Input() title: string;
	@Input() icon: string;
	@Input() command: Command;

	constructor(
		private plugin: GridPlugin,
		templateHost: TemplateHostService
	) {
		templateHost.key = source => `action-${source}-${this.id}.tpl.html`;
	}

	ngOnInit() {
		const { model, disposable } = this.plugin;
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

		disposable.add(() => {
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
