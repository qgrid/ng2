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
import { Fastdom } from 'ng2-qgrid/core/services/fastdom';
import { FetchContext } from 'ng2-qgrid/core/fetch/fetch.context';
import { GridCtrl } from 'ng2-qgrid/core/grid/grid.ctrl';
import { isUndefined, noop } from 'ng2-qgrid/core/utility/kit';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { PipeContext, PipeMemo } from 'ng2-qgrid/core/pipe/pipe.item';
import { StyleRowContext, StyleCellContext } from 'ng2-qgrid/core/style/style.context';
import { Table } from 'ng2-qgrid/core/dom/table';
import { TableCommandManager } from 'ng2-qgrid/core/command/table.command.manager';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Command } from 'ng2-qgrid/core/command/command';

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
	@Input() model: Model;

	@Input('actions') actionItems: Array<Action>;

	@Input('header') gridTitle: string;
	@Input('caption') gridCaption: string;

	@Input('id') gridId: string;

	@Input('columns') dataColumns: Array<ColumnModel>;
	@Input('pipe') dataPipe: Array<(memo: any, context: PipeContext, next: (param: PipeMemo) => void) => any>;
	@Input('rows') dataRows: Array<any>;
	@Input('readonly') dataIsReadonly: boolean;

	@Input() editCancel: Command;
	@Input() editCommit: Command;
	@Input() editEnter: Command;
	@Input() editMethod: null | 'batch';
	@Input() editMode: 'cell' | 'row';
	@Input() editReset: Command;

	@Input() filterFetch: (key: string, context: FetchContext) => any | Promise<any>;;
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

	@Input() sortBy: Array<string>;
	@Input() sortMode: 'single' | 'multiple';;
	@Input() sortTrigger: Array<string>;

	@Input() styleCell: (row: any, column: ColumnModel, context: StyleCellContext) => void | { [key: string]: (row: any, column: ColumnModel, context: any) => void };
	@Input() styleRow: (row: any, context: StyleRowContext) => void;

	@Input() rowMode: 'single' | 'multiple';
	@Input() rowUnit: 'data' | 'details';
	@Input() rowCanMove: boolean;
	@Input() rowCanResize: boolean;

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
			'action',
			'data',
			'edit',
			'filter',
			'grid',
			'group',
			'pivot',
			'row',
			'selection',
			'sort',
			'style'
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
		
		model.style({
			classList: Array.from(element.classList)
		});
		
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
		return this.model.visibility();
	}
}
