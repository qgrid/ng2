import {
	Component,
	Input,
	ViewEncapsulation,
	OnInit,
	ElementRef,
	NgZone,
	Inject,
	ChangeDetectorRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Action } from '@qgrid/core/action/action';
import { AppError } from '@qgrid/core/infrastructure/error';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { Command } from '@qgrid/core/command/command';
import { EventListener } from '@qgrid/core/infrastructure/event.listener';
import { EventManager } from '@qgrid/core/infrastructure/event.manager';
import { eventPath } from '@qgrid/core/services/dom';
import { FetchContext } from '@qgrid/core/fetch/fetch.context';
import { Grid } from './grid';
import { GridCtrl } from '@qgrid/core/grid/grid.ctrl';
import { noop } from '@qgrid/core/utility/kit';
import { PipeContext } from '@qgrid/core/pipe/pipe.item';
import { StyleRowContext, StyleCellContext } from '@qgrid/core/style/style.context';
import { TableCommandManager } from '@qgrid/core/command/table.command.manager';
import { VisibilityModel } from '@qgrid/core/visibility/visibility.model';
import { LayerService } from '../layer/layer.service';
import { GridModelBuilder } from './grid-model.builder';
import { RootComponent } from '../component/root.component';
import { GridRoot } from './grid-root';
import { TemplateCacheService } from '../template/template-cache.service';
import { TemplateLinkService } from '../template/template-link.service';
import { TemplateService } from '../template/template.service';
import { ThemeService } from '../theme/theme.service';
import { GridView } from './grid-view';
import { Disposable } from '../infrastructure/disposable';
import { GridModel } from './grid-model';

@Component({
	selector: 'q-grid',
	providers: [
		GridRoot,
		TemplateCacheService,
		TemplateService,
		GridView,
		Grid,
		TemplateLinkService,
		LayerService,
		Disposable
	],
	styleUrls: ['../../../../assets/index.scss'],
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
	@Input() editMode: null | 'cell' | 'row';
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
	@Input() selectionMode: 'single' | 'multiple' | 'range' | 'singleOnly';
	@Input() selectionUnit: 'row' | 'cell' | 'column' | 'mix';

	@Input() scrollMode: 'default' | 'virtual';

	@Input() sortBy: Array<string>;
	@Input() sortMode: 'single' | 'multiple';
	@Input() sortTrigger: Array<string>;

	@Input() styleCell:
		(row: any, column: ColumnModel, context: StyleCellContext) => void
			| { [key: string]: (row: any, column: ColumnModel, context: any) => void };

	@Input() styleRow:
		(row: any, context: StyleRowContext) => void;

	themeComponent: any;

	constructor(
		private root: GridRoot,
		private elementRef: ElementRef,
		private zone: NgZone,
		private layerService: LayerService,
		private cd: ChangeDetectorRef,
		private disposable: Disposable,
		modelBuilder: GridModelBuilder,
		@Inject(DOCUMENT) private document: any,
		theme: ThemeService,
	) {
		super(modelBuilder, disposable);

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
		super.ngOnInit();

		const { model } = this.root;
		const { nativeElement } = this.elementRef;

		model.style({
			classList: Array.from(nativeElement.classList)
		}, {
			source: 'grid'
		});

		const ctrl = new GridCtrl(
			model, {
			layerFactory: () => this.layerService,
			element: nativeElement
		},
			this.disposable
		);

		this.root.table = ctrl.table;
		this.root.bag = ctrl.bag;
		this.root.markup = ctrl.markup;

		this.root.commandManager = new TableCommandManager(
			f => f(),
			ctrl.table
		);

		const listener = new EventListener(nativeElement, new EventManager(this));
		const docListener = new EventListener(this.document, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			this.disposable.add(docListener.on('focusin', () => ctrl.invalidateActive()));
			this.disposable.add(docListener.on('click', e => {
				const path = eventPath(e);
				const clickedOutside = path.every(x => x !== nativeElement);
				if (clickedOutside) {
					if (model.edit().state === 'edit') {
						model.edit({
							state: 'view'
						}, {
							source: 'document.click'
						});
					}
				}
			}));
		});

		this.disposable.add(listener.on('keydown', e => {
			const result = ctrl.keyDown(e, 'grid');
			if (result.indexOf('selection.view') >= 0) {
				this.cd.markForCheck();
				this.zone.run(noop);
			}
		}));

		this.zone.runOutsideAngular(() => {
			this.disposable.add(listener.on('keyup', e => ctrl.keyUp(e, 'grid')));
		});

		this.disposable.add(model.visibilityChanged.on(() => this.cd.detectChanges()));
	}

	// @deprecated
	get visibility(): VisibilityModel {
		// TODO: get rid of that
		return this.root.model.visibility();
	}
}
