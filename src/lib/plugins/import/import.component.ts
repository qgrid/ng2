import { AfterViewInit, Component, ElementRef, Input, TemplateRef, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { Disposable } from '../../infrastructure/disposable';
import { PluginService } from '../plugin.service';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';
import { TemplateHostService } from '../../template/template-host.service';
import { ImportView } from 'ng2-qgrid/plugin/import/import.view';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';

@Component({
	selector: 'q-grid-import',
	templateUrl: './import.component.html',
	providers: [TemplateHostService, PluginService, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportComponent implements AfterViewInit {
	@Input() options: any;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	context: { $implicit: ImportComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: PluginService,
		private templateHost: TemplateHostService,
		private hostElement: ElementRef,
		private disposable: Disposable
	) {
		this.templateHost.key = () => `import`;
	}

	ngAfterViewInit() {
		const element = this.hostElement.nativeElement;
		const eventListener = new EventListener(element, new EventManager(this));
		const { model } = this.plugin;
		const context = { element, options: this.options };
		const importView = new ImportView(model, context);
		eventListener.on('change', (e) => importView.load(e));
		const action = new Action(
			new Command({ execute: () => importView.upload.execute() }),
			`Import data`,
			'file_upload'
		);

		action.id = 'import';

		if (this.templateRef) {
			action.templateUrl = this.templateHost.key('trigger');
		}

		const items =  Composite.list([model.action().items, [action]]);
		model.action({ items }, { source: 'import.component' });

		this.disposable.add(() => {
			const newItems = model.action().items.filter(x => x.id === action.id);
			model.action({ items: newItems }, { source: 'import.component' });
		});
	}

	get rows() {
		return this.plugin.model.data().rows;
	}

	get columns(): ColumnModel[] {
		return this.plugin.model.columnList().line;
	}

	get id() {
		return this.plugin.model.grid().id;
	}
}
