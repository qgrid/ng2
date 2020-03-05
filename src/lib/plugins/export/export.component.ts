import { AfterViewInit, Component, Input, TemplateRef, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { Disposable } from '../../infrastructure/disposable';
import { PluginService } from '../plugin.service';
import { Command } from 'ng2-qgrid/core/command/command';
import { ExportView } from 'ng2-qgrid/plugin/export/export.view';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';
import { TemplateHostService } from '../../template/template-host.service';

@Component({
	selector: 'q-grid-export',
	templateUrl: './export.component.html',
	providers: [TemplateHostService, PluginService, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportComponent implements AfterViewInit {
	@Input() type: string;
	@ContentChild(TemplateRef, { static: false }) templateRef: TemplateRef<any>;

	context: { $implicit: ExportComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private templateHost: TemplateHostService,
		private disposable: Disposable
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

		action.id = this.type;
		if (this.templateRef) {
			action.templateUrl = this.templateHost.key('trigger');
		}

		const items =  Composite.list([model.action().items, [action]]);
		model.action({ items }, { source: 'export.component' });

		this.disposable.add(() => {
			const newItems = model.action().items.filter(x => x.id === action.id);
			model.action({ items: newItems }, { source: 'export.component' });
		});
	}
}
