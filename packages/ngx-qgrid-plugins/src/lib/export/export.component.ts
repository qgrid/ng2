import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Action, Command, Composite } from '@qgrid/core';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';
import { ExportPlugin } from '@qgrid/plugins';

@Component({
	selector: 'q-grid-export',
	templateUrl: './export.component.html',
	providers: [
		TemplateHostService,
		GridPlugin
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportComponent implements AfterViewInit {
	@Input() type: string;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	context: { $implicit: ExportComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private templateHost: TemplateHostService
	) {
		this.templateHost.key = () => `export-${this.type}`;
	}

	ngAfterViewInit() {
		const { model, disposable } = this.plugin;
		const exportPlugin = new ExportPlugin(model, this.type);
		const action = new Action(
			new Command({
				execute: () => exportPlugin[this.type].execute()
			}),
			`Export to ${this.type}`,
			'file_download'
		);

		if (this.templateRef) {
			action.templateUrl = this.templateHost.key('trigger');
		}

		const items = Composite.list([model.action().items, [action]]);
		model.action({
			items
		}, {
			source: 'export.component'
		});

		disposable.add(() => {
			model.action({
				items: model
					.action()
					.items
					.filter(x => x !== action)
			}, {
				source: 'export.component'
			});
		});
	}
}
