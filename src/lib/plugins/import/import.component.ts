import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { PluginService } from '../plugin.service';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { Command } from 'ng2-qgrid/core/command/command';
import { Xlsx } from 'ng2-qgrid/plugin/export/xlsx';
import { Pdf } from 'ng2-qgrid/plugin/export/pdf';
import { downloadFactory } from 'ng2-qgrid/plugin/export/download';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';
import { TemplateHostService } from '../../template/template-host.service';
import { ImportView } from 'ng2-qgrid/plugin/import/import.view';

@Component({
	selector: 'q-grid-import',
	templateUrl: './import.component.html',
	providers: [ TemplateHostService, PluginService ]
})
export class ImportComponent implements AfterViewInit {
	@Input() type: string;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	context: { $implicit: ImportComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService, private templateHost: TemplateHostService) {
		this.templateHost.key = () => `import-data`;
	}

	ngAfterViewInit() {
		const { model } = this.plugin;
		const importView = new ImportView(model, { element: '', options: 'Kate' });
		const action = new Action(
			new Command({ execute: () => importView.upload.execute() }),
			`Import data`,
			'file_upload'
		);

		if (this.templateRef) {
			action.templateUrl = this.templateHost.key('trigger');
		}

		model.action({
			items: Composite.list([ model.action().items, [ action ] ])
		}, {
			source: 'import.component'
		});
	}

	get rows() {
		return this.plugin.model.data().rows;
	}

	get columns() {
		return this.plugin.model.columnList().line;
	}

	get id() {
		return this.plugin.model.grid().id;
	}
}

