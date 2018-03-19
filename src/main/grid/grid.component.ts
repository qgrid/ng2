import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewEncapsulation,
	OnInit,
	OnDestroy,
	ElementRef,
	EmbeddedViewRef,
	ComponentRef,
	NgZone
} from '@angular/core';
import { TemplateCacheService } from 'ng2-qgrid/template/template-cache.service';
import { TemplateService } from 'ng2-qgrid/template/template.service';
import { RootComponent } from 'ng2-qgrid/infrastructure/component/root.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { Table } from 'ng2-qgrid/core/dom';
import { AppError } from 'ng2-qgrid/core/infrastructure';
import { TableCommandManager } from 'ng2-qgrid/core/command';
import { isUndefined } from 'ng2-qgrid/core/utility';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { GridCtrl } from 'ng2-qgrid/core/grid/grid.ctrl';
import { ViewCoreService } from 'ng2-qgrid/main/core/view/view-core.service';
import { ThemeService } from 'ng2-qgrid/template/theme.service';
import { GridService } from './grid.service';
import { TemplateLinkService } from '../../template/template-link.service';
import { LayerService } from '../core/layer/layer.service';

@Component({
	selector: 'q-grid',
	providers: [
		RootService,
		TemplateCacheService,
		TemplateService,
		ViewCoreService,
		GridService,
		TemplateLinkService,
		LayerService
	],
	styleUrls: ['../../assets/index.scss', '../../theme/material/index.scss'],
	templateUrl: './grid.component.html',
	encapsulation: ViewEncapsulation.None
})
export class GridComponent extends RootComponent implements OnInit, OnDestroy {
	private ctrl: GridCtrl;
	private listener: EventListener;

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
	@Input() filterUnit;
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

	public themeComponent: any;

	constructor(
		private rootService: RootService,
		private element: ElementRef,
		private theme: ThemeService,
		private zone: NgZone,
		private layerService: LayerService
	) {
		super();

		this.models = [
			'grid',
			'data',
			'selection',
			'sort',
			'group',
			'filter',
			'pivot',
			'edit',
			'style',
			'action'
		];

		this.using(
			this.modelChanged.watch(model => (this.rootService.model = model))
		);

		if (!theme.component) {
			throw new AppError(
				'grid.component',
				'Ensure that grid theme module was included'
			);
		}

		this.themeComponent = theme.component;
	}

	ngOnInit() {
		super.ngOnInit();

		const model = this.model;

		const element = this.element.nativeElement;
		const ctrl = (this.ctrl = new GridCtrl(model, {
			layerFactory: () => this.layerService,
			element
		}));

		this.rootService.table = ctrl.table;
		this.rootService.bag = ctrl.bag;
		this.rootService.markup = ctrl.markup;
		this.rootService.commandManager = new TableCommandManager(
			f => f(),
			ctrl.table
		);

		const listener = new EventListener(element, new EventManager(this));
		const windowListener = new EventListener(element, new EventManager(this));

		this.using(windowListener.on('focusin', ctrl.invalidateActive.bind(ctrl)));
		this.using(listener.on('keydown', e => ctrl.keyDown(e)));
	}

	get visibility() {
		// TODO: get rid of that
		return this.model.visibility();
	}
}
