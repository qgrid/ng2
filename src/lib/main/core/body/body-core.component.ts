import { Component, ElementRef, OnInit, NgZone, Input, ChangeDetectorRef } from '@angular/core';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { SelectionModel } from 'ng2-qgrid/core/selection/selection.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { BodyCtrl } from 'ng2-qgrid/core/body/body.ctrl';
import { RootService } from '../../../infrastructure/component/root.service';
import { ViewCoreService } from '../view/view-core.service';
import { TableCoreService } from '../table/table-core.service';
import { Disposable } from '../../../infrastructure/disposable';

@Component({
	// tslint:disable-next-line
	selector: 'tbody[q-grid-core-body]',
	templateUrl: './body-core.component.html',
	providers: [Disposable]
})
export class BodyCoreComponent implements OnInit {
	@Input() pin = 'body';

	columnId: (index: number, item: ColumnView) => any;
	rowId: (index: number, row: any) => any;

	constructor(
		public $view: ViewCoreService,
		public $table: TableCoreService,
		private elementRef: ElementRef,
		private root: RootService,
		private zone: NgZone,
		private cd: ChangeDetectorRef,
		private disposable: Disposable

	) {
	}

	ngOnInit() {
		const { model } = this.root;
		const { id } = model.data();

		this.rowId = id.row;
		this.columnId = (index, columnView) => id.column(index, columnView.model);

		const table = this.$table;
		const view = this.$view;
		const nativeElement = this.elementRef.nativeElement as HTMLElement;

		const ctrl = new BodyCtrl(model, view, this.root.table, this.root.bag);
		const listener = new EventListener(nativeElement, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			this.disposable.add(listener.on('wheel', e => ctrl.onWheel(e)));

			this.disposable.add(listener.on('scroll', () =>
				ctrl.onScroll({
					scrollLeft: table.pin ? model.scroll().left : nativeElement.scrollLeft,
					scrollTop: nativeElement.scrollTop
				}),
				{ passive: true }
			));

			this.disposable.add(listener.on('mousemove', ctrl.onMouseMove.bind(ctrl)));
			this.disposable.add(listener.on('mouseleave', ctrl.onMouseLeave.bind(ctrl)));
			this.disposable.add(listener.on('mousedown', e => {
				this.cd.markForCheck();
				this.zone.run(() => ctrl.onMouseDown(e));
			}));
			this.disposable.add(listener.on('mouseup', e => {
				ctrl.onMouseUp(e);
			}));
		});

		this.disposable.add(model.dataChanged.watch(e => {
			if (e.hasChanges('id')) {
				this.rowId = e.state.id.row;
				const columnId = e.state.id.column;
				this.columnId = (index, columnView) => columnId(index, columnView.model);
			}
		}));

		this.disposable.add(model.sceneChanged.watch(e => {
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
		}));
	}

	get selection(): SelectionModel {
		return this.model.selection();
	}

	get model(): Model {
		return this.root.model;
	}
}
