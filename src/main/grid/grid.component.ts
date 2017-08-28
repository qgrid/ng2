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
import {TemplateCacheService} from '@grid/template';
import {RootComponent, RootService} from '@grid/infrastructure/component';
import {LayerService} from '../layer';
import {Table} from '@grid/core/dom';
import {AppError} from '@grid/core/infrastructure';
import {TableCommandManager} from '@grid/core/command';
import {isUndefined} from '@grid/core/utility';
import {EventManager} from '@grid/core/infrastructure/event.manager';
import {EventListener} from '@grid/core/infrastructure/event.listener';

@Component({
	selector: 'q-grid',
	providers: [
		RootService,
		TemplateCacheService
	],
	styles: [
		require('@grid/assets/index.scss'),
		require('@grid/theme/index.scss')
	],
	template: require('./grid.component.html'),
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
	@Input('actions') actionItems;
	@Output() selectionChanged = new EventEmitter<any>();

	listener: EventListener;

	constructor(private rootService: RootService, private element: ElementRef, private changeDetector: ChangeDetectorRef) {
		super();

		this.models = ['data', 'selection', 'sort', 'group', 'pivot', 'edit', 'style', 'action'];
		this.using(this.modelChanged.watch(model => this.rootService.model = model));

		const apply = rootService.applyFactory(null, 'sync');
		this.listener = new EventListener(element.nativeElement, new EventManager(this, apply));
	}

	ngOnInit() {
		super.ngOnInit();

		const model = this.model;
		if (model.grid().status === 'bound') {
			throw new AppError('grid', `Model is already used by grid "${model.grid().id}"`);
		}

		model.grid({
			status: 'bound'
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
		this.rootService.commandManager = new TableCommandManager(this.rootService.applyFactory(), table);

		this.using(this.listener.on('keydown', e => {
			if (model.action().shortcut.keyDown(e)) {
				e.preventDefault();
				e.stopPropagation();
			}
		}));

		this.using(this.model.viewChanged.watch(e => {
			if (e.hasChanges('columns')) {
				this.invalidateVisibility();
			}
		}));
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
