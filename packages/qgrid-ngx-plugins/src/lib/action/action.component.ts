import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Action, Command, guid } from '@qgrid/core';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-action',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [GridPlugin, TemplateHostService]
})
export class ActionComponent implements OnInit {
	@ContentChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

	@Input() title: string;
	@Input() icon: string;
	@Input() command: Command;

	constructor(
		private plugin: GridPlugin,
		private templateHost: TemplateHostService
	) {
		const id = guid();
		templateHost.key = source => `action-${source}-${id}.tpl.html`;
	}

	ngOnInit() {
		const { model, disposable } = this.plugin;
		const action = new Action(
			this.command || new Command(),
			this.title,
			this.icon
		);

		if (this.templateRef) {
			action.templateUrl = this.templateHost.key('trigger');
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
