import { AfterViewInit, Component, Input, TemplateRef, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';
import { Command } from '@qgrid/core/command/command';
import { ExportPlugin } from '@qgrid/plugins/export/export.plugin';
import { Action } from '@qgrid/core/action/action';
import { Composite } from '@qgrid/core/infrastructure/composite';

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

		action.id = this.type;
		if (this.templateRef) {
			action.templateUrl = this.templateHost.key('trigger');
		}

		const items = Composite.list([model.action().items, [action]]);
		model.action({ items }, { source: 'export.component' });

		disposable.add(() => {
			const notExportItems = model.action().items.filter(x => x.id !== action.id);
			model.action({ items: notExportItems }, { source: 'export.component' });
		});
	}
}
