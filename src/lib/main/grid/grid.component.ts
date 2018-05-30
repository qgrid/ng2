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
	NgZone,
	ApplicationRef
} from '@angular/core';
import { RootComponent } from '../../infrastructure/component/root.component';
import { RootService } from '../../infrastructure/component/root.service';
import { Table } from 'ng2-qgrid/core/dom/table';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { TableCommandManager } from 'ng2-qgrid/core/command/table.command.manager';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
import { isUndefined } from 'ng2-qgrid/core/utility/kit';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { GridCtrl } from 'ng2-qgrid/core/grid/grid.ctrl';
import { Fastdom } from 'ng2-qgrid/core/services/fastdom';
import { TemplateCacheService } from '../../template/template-cache.service';
import { TemplateService } from '../../template/template.service';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { ThemeService } from '../../template/theme.service';
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
	@Input() sortTrigger;
	@Input() sortMode;
	@Input() filterUnit;
	@Input() filterFetch;
	@Input() editMode;
	@Input() editMethod;
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
		private layerService: LayerService,
		private app: ApplicationRef
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

		this.modelChanged.watch(model => (this.rootService.model = model));

		if (!theme.component) {
			throw new AppError(
				'grid.component',
				'Ensure that grid theme module was included'
			);
		}

		this.themeComponent = theme.component;
	}

	ngOnInit() {
		const model = this.model;

		const element = this.element.nativeElement;
		const ctrl = this.using(new GridCtrl(model, {
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

		const navDebounce = model.navigation().debounce;
		if (navDebounce) {
			const navJob = new jobLine(navDebounce);
			this.zone.runOutsideAngular(() => {
				listener.on('keydown', e => {
					const result = ctrl.keyDown(e);
					if (result.indexOf('navigation') >= 0) {
						navJob(() => this.app.tick());
					} else if (result.length) {
						this.app.tick();
					}
				});
			});
		} else {
			listener.on('keydown', e => {
				const result = ctrl.keyDown(e);
				if (result.length) {
					this.app.tick();
				}
			});
		}
	}

	get visibility() {
		// TODO: get rid of that
		return this.model.visibility();
	}
}
