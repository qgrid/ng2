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
		const action = new Action(
			this.command || new Command(),
			this.title,
			this.icon
		);

		if (this.id) {
			action.templateUrl = `action-trigger-${this.id}.tpl.html`;
		}

		model.action({
			items: model
				.action()
				.items
				.concat([action])
		}, {
			source: 'action.component'
		});

		disposable.add(() =>
			model.action({
				items: model
					.action()
					.items
					.filter(x => x !== action)
			})
		);
	}
}
