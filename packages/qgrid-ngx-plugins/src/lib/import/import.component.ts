import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { Action, ColumnModel, Command, Composite, EventListener, EventManager } from '@qgrid/core';
import { GridPlugin, TemplateHostService } from '@qgrid/ngx';
import { ImportPlugin } from '@qgrid/plugins';

@Component({
	selector: 'q-grid-import',
	templateUrl: './import.component.html',
	providers: [TemplateHostService, GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportComponent implements AfterViewInit {
	@Input() options: any;
	@ContentChild(TemplateRef) templateRef: TemplateRef<any>;

	context: { $implicit: ImportComponent } = {
		$implicit: this
	};

	get rows() {
		return this.plugin.model.data().rows;
	}

	get columns(): ColumnModel[] {
		return this.plugin.model.columnList().line;
	}

	get id() {
		return this.plugin.model.grid().id;
	}

	constructor(
		private plugin: GridPlugin,
		private templateHost: TemplateHostService,
		private hostElement: ElementRef
	) {
		this.templateHost.key = () => 'import';
	}

	ngAfterViewInit() {
		const { model, disposable } = this.plugin;
		const { nativeElement } = this.hostElement;

		const eventListener = new EventListener(nativeElement, new EventManager(this));
		const importPlugin = new ImportPlugin(model, nativeElement, this.options);

		eventListener.on('change', (e) => importPlugin.load(e));

		const action = new Action(
			new Command({
				execute: () => importPlugin.upload()
			}),
			'Import data',
			'file_upload'
		);

		if (this.templateRef) {
			action.templateUrl = this.templateHost.key('trigger');
		}

		const items = Composite.list([model.action().items, [action]]);

		model.action({
			items
		}, {
			source: 'import.component'
		});

		disposable.add(() => {
			// notImportItems
			model.action({
				items: model
					.action()
					.items
					.filter(x => x !== action)
			}, {
				source: 'import.component'
			});
		});
	}
}
