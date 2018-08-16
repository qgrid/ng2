import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewEncapsulation,
	OnInit,
	ElementRef,
	NgZone,
	Inject
} from '@angular/core';
import { RootComponent } from '../../infrastructure/component/root.component';
import { RootService } from '../../infrastructure/component/root.service';
import { LayerService } from '../core/layer/layer.service';
import { GridService } from './grid.service';
import { TemplateCacheService } from '../../template/template-cache.service';
import { TemplateLinkService } from '../../template/template-link.service';
import { TemplateService } from '../../template/template.service';
import { ThemeService } from '../../template/theme.service';
import { ViewCoreService } from '../../main/core/view/view-core.service';
import { Action } from 'ng2-qgrid/core/action/action';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { FetchContext } from 'ng2-qgrid/core/fetch/fetch.context';
import { GridCtrl } from 'ng2-qgrid/core/grid/grid.ctrl';
import { noop } from 'ng2-qgrid/core/utility/kit';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
import { PipeContext } from 'ng2-qgrid/core/pipe/pipe.item';
import { StyleRowContext, StyleCellContext } from 'ng2-qgrid/core/style/style.context';
import { TableCommandManager } from 'ng2-qgrid/core/command/table.command.manager';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Command } from 'ng2-qgrid/core/command/command';
import { GridModel } from '../../plugins/plugin.service';
import { DOCUMENT } from '@angular/platform-browser';

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
	styleUrls: ['../../assets/index.scss'],
	templateUrl: './grid.component.html',
	encapsulation: ViewEncapsulation.None
})
export class GridComponent extends RootComponent implements OnInit {
	@Input() model: GridModel;

	@Input('actions') actionItems: Array<Action>;

	@Input('header') gridTitle: string;
	@Input('caption') gridCaption: string;
	@Input('interactionMode') gridInteractionMode: 'full' | 'readonly' | 'detached';

	@Input('id') gridId: string;

	@Input('columns') dataColumns: Array<ColumnModel>;
	@Input('pipe') dataPipe: Array<(memo: any, context: PipeContext, next: (memo: any) => void) => any>;
	@Input('rows') dataRows: Array<any>;

	@Input() editCancel: Command;
	@Input() editCommit: Command;
	@Input() editEnter: Command;
	@Input() editMethod: null | 'batch';
	@Input() editMode: 'cell' | 'row';
	@Input() editReset: Command;

	@Input() filterFetch: (key: string, context: FetchContext) => any | Promise<any>;
	@Input() filterUnit: 'default' | 'row';

	@Input() groupBy: Array<string>;
	@Input() groupMode: 'nest' | 'column' | 'subhead' | 'rowspan';
	@Input() groupSummary: null | 'leaf';

	@Input() pivotBy: Array<string>;

	@Input('selection') selectionItems: Array<any>;
	@Input() selectionArea: 'custom' | 'body';
	@Input() selectionKey: {
		row: () => void,
		column: () => void
	};
	@Input() selectionMode: 'single' | 'multiple' | 'range';
	@Input() selectionUnit: 'row' | 'cell' | 'column' | 'mix';

	@Input() scrollMode: 'default' | 'virtual';

	@Input() sortBy: Array<string>;
	@Input() sortMode: 'single' | 'multiple';
	@Input() sortTrigger: Array<string>;

	@Input() styleCell:
		(row: any, column: ColumnModel, context: StyleCellContext) => void
			| { [key: string]: (row: any, column: ColumnModel, context: any) => void };

	@Input() styleRow: (row: any, context: StyleRowContext) => void;

	@Output() selectionChanged = new EventEmitter<any>();

	public themeComponent: any;

	constructor(
		private root: RootService,
		private element: ElementRef,
		private zone: NgZone,
		private layerService: LayerService,
		@Inject(DOCUMENT) private document: any,
		theme: ThemeService,
	) {
		super();

		this.models = [
			'action',
			'data',
			'edit',
			'filter',
			'grid',
			'group',
			'pivot',
			'row',
			'selection',
			'scroll',
			'sort',
			'style'
		];

		this.modelChanged.watch(model => this.root.model = model);

		if (!theme.component) {
			throw new AppError(
				'grid.component',
				'Ensure that grid theme module was included'
			);
		}

		this.themeComponent = theme.component;
	}

	ngOnInit() {
		const model = this.root.model;

		const element = this.element.nativeElement;

		model.style({
			classList: Array.from(element.classList)
		});

		const ctrl = this.using(new GridCtrl(model, {
			layerFactory: () => this.layerService,
			element
		}));


		this.root.table = ctrl.table;
		this.root.bag = ctrl.bag;
		this.root.markup = ctrl.markup;

		this.root.commandManager = new TableCommandManager(
			f => f(),
			ctrl.table
		);

		const listener = new EventListener(element, new EventManager(this));
		const docListener = new EventListener(this.document, new EventManager(this));

		this.zone.runOutsideAngular(() => this.using(docListener.on('focusin', () => ctrl.invalidateActive())));

		const { debounce } = model.navigation();
		if (debounce) {
			const navJob = jobLine(debounce);
			this.zone.runOutsideAngular(() => {
				listener.on('keydown', e => {
					const result = ctrl.keyDown(e);
					if (result.indexOf('navigation') >= 0) {
						navJob((() => this.zone.run(noop)));
					} else if (result.length) {
						// app.tick is not working correctly, why?
						this.zone.run(noop);
					}
				});
			});
		} else {
			listener.on('keydown', e => {
				const result = ctrl.keyDown(e);
				if (result.length) {
					this.zone.run(noop);
				}
			});
		}
	}

	// @deprecated
	get visibility(): VisibilityModel {
		// TODO: get rid of that
		return this.root.model.visibility();
	}
}
