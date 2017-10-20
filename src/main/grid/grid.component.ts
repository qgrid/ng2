import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewEncapsulation,
	OnInit,
	ElementRef,
	ChangeDetectorRef
} from '@angular/core';
import { TemplateCacheService } from 'ng2-qgrid/template/template-cache.service';
import { TemplateService } from 'ng2-qgrid/template/template.service';
import { RootComponent, RootService } from 'ng2-qgrid/infrastructure/component';
import { LayerService } from '../layer';
import { Table } from 'ng2-qgrid/core/dom';
import { AppError } from 'ng2-qgrid/core/infrastructure';
import { TableCommandManager } from 'ng2-qgrid/core/command';
import { isUndefined } from 'ng2-qgrid/core/utility';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';

@Component({
	selector: 'q-grid',
	providers: [RootService, TemplateCacheService, TemplateService],
	styleUrls: ['../../assets/index.scss', '../../themes/material/index.scss'],
	templateUrl: './grid.component.html',
	encapsulation: ViewEncapsulation.None
})
export class GridComponent extends RootComponent implements OnInit {
	@Input() model;
	@Input('rows') dataRows;
	@Input('columns') dataColumns;
	@Input('pipe') dataPipe;
	@Input('selection') selectionItems;
	@Input() selectionMode;
	@Input() selectionUnit;
	@Input() selectionKey;
	@Input() groupBy;
	@Input() pivotBy;
	@Input() sortBy;
	@Input() sortMode;
	@Input() editMode;
	@Input() editEnter;
	@Input() editCommit;
	@Input() editCancel;
	@Input() editReset;
	@Input() styleRow;
	@Input() styleCell;
	@Input('id') gridId;
	@Input('header') gridTitle;
	@Input('actions') actionItems;
	@Output() selectionChanged = new EventEmitter<any>();

	listener: EventListener;

	constructor(
		private rootService: RootService,
		private element: ElementRef,
		private changeDetector: ChangeDetectorRef
	) {
		super();

		this.models = [
			'data',
			'selection',
			'sort',
			'group',
			'pivot',
			'edit',
			'style',
			'action'
		];
		this.using(
			this.modelChanged.watch(model => (this.rootService.model = model))
		);

		const apply = rootService.applyFactory(null, 'sync');
		this.listener = new EventListener(
			element.nativeElement,
			new EventManager(this, apply)
		);
	}

	ngOnInit() {
		super.ngOnInit();

		const model = this.model;
		const grid = model.grid;
		if (grid().status === 'bound') {
			throw new AppError(
				'grid',
				`Model is already used by grid "${model.grid().id}"`
			);
		}

		grid({
			status: 'bound',
			title: this.gridTitle || ''
		});

		if (!this.gridId) {
			this.element.nativeElement.id = model.grid().id;
		}

		const markup = this.rootService.markup;
		const layerService = new LayerService(markup);
		const tableContext = {
			layer: name => layerService.create(name),
			bag: this.rootService.bag
		};

		const table = new Table(model, markup, tableContext);
		this.rootService.table = table;
		this.rootService.commandManager = new TableCommandManager(
			this.rootService.applyFactory(),
			table
		);

		this.using(
			this.listener.on('keydown', e => {
				if (model.action().shortcut.keyDown(e)) {
					e.preventDefault();
					e.stopPropagation();
				}
			})
		);

		this.using(
			this.model.viewChanged.watch(e => {
				if (e.hasChanges('columns')) {
					this.invalidateVisibility();
				}
			})
		);
	}

	invalidateVisibility() {
		const columns = this.model.data().columns;
		const visibility = this.model.visibility;
		visibility({
			pin: {
				left: columns.some(c => c.pin === 'left'),
				right: columns.some(c => c.pin === 'right')
			}
		});
	}

	get isActive() {
		return this.rootService.table.view.isFocused();
	}

	get visibility() {
		// TODO: get rid of that
		return this.model.visibility();
	}
}
