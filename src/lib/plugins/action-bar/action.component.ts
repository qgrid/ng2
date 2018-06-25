import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Action as ActionItem } from 'ng2-qgrid/core/action/action';
import { Command } from 'ng2-qgrid/core/command/command';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { TemplateHostService } from '../../template/template-host.service';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-action',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TemplateHostService]
})
export class ActionComponent implements OnInit {
	@Input() public id: string = null;
	@Input() public title: string = null;
	@Input() public icon: string = null;
	@Input() public command: Command = null;

	constructor(private plugin: PluginService, templateHost: TemplateHostService) {
		templateHost.key = source => `action-${source}-${this.id}.tpl.html`;
	}

	execute() {
		return this.command && this.command.execute();
	}

	canExecute() {
		return this.command && this.command.canExecute();
	}

	ngOnInit() {
		const model = this.model;

		const hasCommand = !!this.command;
		const command = hasCommand ? this.command : new Command();
		const action = new ActionItem(command, this.title, this.icon);
		action.id = this.id;

		const actions = Array.from(model.action().items);
		actions.push(action);

		model.action({ items: actions }, { source: 'action.component' });

		if (!hasCommand) {
			if (!this.id) {
				throw new AppError('action.component', 'Command or id property is missed');
			}

			action.templateUrl = `action-trigger-${this.id}.tpl.html`;
		}
	}

	get model(): Model {
		return this.plugin.model;
	}
}
