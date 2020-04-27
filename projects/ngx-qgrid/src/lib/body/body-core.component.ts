import { Component, ElementRef, OnInit, NgZone, Input, ChangeDetectorRef } from '@angular/core';
import { EventListener } from '@qgrid/core/infrastructure/event.listener';
import { EventManager } from '@qgrid/core/infrastructure/event.manager';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { SelectionModel } from '@qgrid/core/selection/selection.model';
import { GridModel } from '../grid/grid-model';
import { BodyCtrl } from '@qgrid/core/body/body.ctrl';
import { GridRoot } from '../grid/grid-root';
import { GridView } from '../grid/grid-view';
import { TableCoreService } from '../table/table-core.service';
import { GridPlugin } from '../plugin/grid-plugin';

@Component({
	// tslint:disable-next-line
	selector: 'tbody[q-grid-core-body]',
	templateUrl: './body-core.component.html',
	providers: [GridPlugin]
})
export class BodyCoreComponent implements OnInit {
	@Input() pin = 'body';

	columnId: (index: number, item: ColumnView) => any;
	rowId: (index: number, row: any) => any;

	constructor(
		public $view: GridView,
		public $table: TableCoreService,
		private elementRef: ElementRef,
		private root: GridRoot,
		private zone: NgZone,
		private cd: ChangeDetectorRef,
		private plugin: GridPlugin
	) {
	}

	ngOnInit() {
		const { model, table, disposable, observeReply } = this.plugin;
		const { id } = model.data();

		this.rowId = id.row;
		this.columnId = (index, columnView) => id.column(index, columnView.model);

		const nativeElement = this.elementRef.nativeElement as HTMLElement;

		const ctrl = new BodyCtrl(model, this.$view, table, this.root.bag);
		const listener = new EventListener(nativeElement, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			disposable.add(listener.on('wheel', e => ctrl.onWheel(e)));
			disposable.add(listener.on('scroll', () =>
				ctrl.onScroll({
					scrollLeft: this.$table.pin ? model.scroll().left : nativeElement.scrollLeft,
					scrollTop: nativeElement.scrollTop
				}),
				{ passive: true }
			));
			disposable.add(listener.on('mousemove', ctrl.onMouseMove.bind(ctrl)));
			disposable.add(listener.on('mouseleave', ctrl.onMouseLeave.bind(ctrl)));
			disposable.add(listener.on('mousedown', e => {
				this.cd.markForCheck();
				this.zone.run(() => ctrl.onMouseDown(e));
			}));
			disposable.add(listener.on('mouseup', e => {
				ctrl.onMouseUp(e);
			}));
		});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('id')) {
					this.rowId = e.state.id.row;
					const columnId = e.state.id.column;
					this.columnId = (index, columnView) => columnId(index, columnView.model);
				}
			});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (model.grid().interactionMode === 'detached') {
					if (e.hasChanges('status')) {
						switch (e.state.status) {
							case 'stop':
								this.cd.detach();
								break;
							case 'start':
								this.cd.reattach();
								break;
						}
					}
				}
			});
	}

	get selection(): SelectionModel {
		return this.model.selection();
	}

	get model(): GridModel {
		return this.plugin.model;
	}
}
