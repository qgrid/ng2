import { AfterViewInit, Component, ElementRef, Input, TemplateRef, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { Command } from '@qgrid/core/command/command';
import { Action } from '@qgrid/core/action/action';
import { Composite } from '@qgrid/core/infrastructure/composite';
import { ImportPlugin } from '@qgrid/plugins/import/import.plugin';
import { EventManager } from '@qgrid/core/infrastructure/event.manager';
import { EventListener } from '@qgrid/core/infrastructure/event.listener';
import { TemplateHostService, Disposable } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-import',
	templateUrl: './import.component.html',
	providers: [TemplateHostService, GridPlugin, Disposable],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportComponent implements AfterViewInit {
	@Input() options: any;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	context: { $implicit: ImportComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
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
		const importPlugin = new ImportPlugin(model, context);
		eventListener.on('change', (e) => importPlugin.load(e));
		const action = new Action(
			new Command({ execute: () => importPlugin.upload.execute() }),
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
