import {
	Component,
	Input,
	ViewEncapsulation,
	OnInit,
	ElementRef,
	NgZone,
	Inject,
	ChangeDetectorRef,
	SimpleChanges,
	OnChanges
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Action } from '@qgrid/core/action/action';
import { ActionState } from '@qgrid/core/action/action.state';
import { AppError } from '@qgrid/core/infrastructure/error';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { Command } from '@qgrid/core/command/command';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { eventPath } from '@qgrid/core/services/dom';
import { FetchContext } from '@qgrid/core/fetch/fetch.context';
import { Grid } from './grid';
import { GridHost } from '@qgrid/core/grid/grid.host';
import { GridLet } from './grid-let';
import { GridModel } from './grid-model';
import { GridModelBuilder } from './grid-model.builder';
import { GridPlugin } from '../plugin/grid-plugin';
import { GridRoot } from './grid-root';
import { GridState } from '@qgrid/core/grid/grid.state';
import { LayerService } from '../layer/layer.service';
import { noop } from '@qgrid/core/utility/kit';
import { PipeContext } from '@qgrid/core/pipe/pipe.item';
import { StyleRowCallback, StyleCellCallback } from '@qgrid/core/style/style.state';
import { TableCommandManager } from '@qgrid/core/command/table.command.manager';
import { tableFactory } from '@qgrid/core/dom/table.factory';
import { TemplateCacheService } from '../template/template-cache.service';
import { TemplateLinkService } from '../template/template-link.service';
import { TemplateService } from '../template/template.service';
import { ThemeService } from '../theme/theme.service';
import { VisibilityState } from '@qgrid/core/visibility/visibility.state';

@Component({
	selector: 'q-grid',
	providers: [
		Grid,
		GridPlugin,
		GridRoot,
		GridLet,
		LayerService,
		TemplateCacheService,
		TemplateLinkService,
		TemplateService,
	],
	styleUrls: ['../../../../assets/index.scss'],
	templateUrl: './grid.component.html',
	encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit, OnChanges {
	private actionAccessor = this.plugin.stateAccessor(ActionState);
	private gridAccessor = this.plugin.stateAccessor(GridState);

	@Input() set model(value: GridModel) {
		this.root.model = value;
	}

	get model(): GridModel {
		return this.root.model;
	}

	@Input('actions') set actionItems(items: Action[]) { this.actionAccessor({ items }); }

	@Input('id') set gridId(id) { this.gridAccessor({ id }); }
	@Input('header') set gridTitle(header) { this.gridAccessor({ caption: header }); }
	@Input('caption') set gridCaption(caption) { this.gridAccessor({ caption }); }
	@Input('interactionMode') gridInteractionMode(interactionMode) { this.gridAccessor({ interactionMode }); }

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
	@Input() selectionMode: 'single' | 'multiple' | 'range' | 'singleOnly';
	@Input() selectionUnit: 'row' | 'cell' | 'column' | 'mix';
	@Input() selectionKey: {
		row: () => void,
		column: () => void
	};

	@Input() scrollMode: 'default' | 'virtual';

	@Input() sortBy: Array<string>;
	@Input() sortMode: 'single' | 'multiple';
	@Input() sortTrigger: Array<string>;

	@Input() styleCell: StyleCellCallback | { [key: string]: StyleCellCallback };
	@Input() styleRow: StyleRowCallback;

	themeComponent: any;

	constructor(
		private root: GridRoot,
		private plugin: GridPlugin,
		private elementRef: ElementRef,
		private zone: NgZone,
		private layerService: LayerService,
		private cd: ChangeDetectorRef,
		private modelBuilder: GridModelBuilder,
		@Inject(DOCUMENT) private document: any,
		theme: ThemeService,
	) {
		if (!theme.component) {
			throw new AppError(
				'grid.component',
				'Ensure that grid theme module was included'
			);
		}

		this.themeComponent = theme.component;
	}

	ngOnInit() {
		// if (!this.keepChanges) {
		// 	this.keepChanges = this.setup();
		// }

		const { model, disposable, observe } = this.plugin;
		const { nativeElement } = this.elementRef;

		model.style({
			classList: Array.from(nativeElement.classList)
		}, {
			source: 'grid'
		});

		const table = tableFactory(model, name => this.layerService.create(name));
		const commandManager = new TableCommandManager(f => f(), table);
		const host = new GridHost(nativeElement, this.plugin);

		this.root.table = table;
		this.root.commandManager = commandManager;

		const listener = new EventListener(nativeElement, new EventManager(this));
		const docListener = new EventListener(this.document, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			disposable.add(
				docListener.on('focusin', () => host.invalidateActive())
			);

			disposable.add(
				docListener.on('click', e => {
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

		disposable.add(
			listener.on('keydown', e => {
				const result = host.keyDown(e, 'grid');
				if (result.indexOf('selection.view') >= 0) {
					this.cd.markForCheck();
					this.zone.run(noop);
				}
			}));

		this.zone.runOutsideAngular(() => {
			disposable.add(
				listener.on('keyup', e => host.keyUp(e, 'grid'))
			);
		});

		observe(model.visibilityChanged)
			.subscribe(() => this.cd.detectChanges())
	}

	ngOnChanges(changes: SimpleChanges): void {

	}

	// @deprecated
	get visibility(): VisibilityState {
		// TODO: get rid of that
		const { model } = this;
		return model.visibility();
	}
}