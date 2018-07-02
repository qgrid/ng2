import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { PluginService } from '../plugin.service';
import { Command } from 'ng2-qgrid/core/command/command';
import { ExportView } from 'ng2-qgrid/plugin/export/export.view';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-export',
	template: '',
	providers: [TemplateHostService, PluginService]
})
export class ExportComponent implements AfterViewInit {
	@Input() type: string;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	context: { $implicit: ExportComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private templateHost: TemplateHostService
	) {
		this.templateHost.key = () => `export-${this.type}`;
	}

	ngAfterViewInit() {
		const { model } = this.plugin;
		const exportView = new ExportView(model, { type: this.type });
		const action = new Action(
			new Command({ execute: () => exportView[this.type].execute() }),
			`Export to ${this.type}`,
			'file_download'
		);

		if (this.templateRef) {
			action.templateUrl = this.templateHost.key('trigger');
		}

		model.action({
			items: Composite.list([model.action().items, [action]])
		}, {
				source: 'export.component'
			});
	}
}
