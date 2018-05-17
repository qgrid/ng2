import { Component, ElementRef, OnInit, NgZone } from '@angular/core';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { PathService } from 'ng2-qgrid/core/path';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { SelectionModel } from 'ng2-qgrid/core/selection/selection.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { BodyCtrl } from 'ng2-qgrid/core/body/body.ctrl';
import { NgComponent } from '../../../infrastructure/component/ng.component';
import { RootService } from '../../../infrastructure/component/root.service';
import { ViewCoreService } from '../view/view-core.service';
import { TableCoreService } from '../table/table-core.service';
import { ScrollService } from 'ng2-qgrid/core/scroll/scroll.service';

@Component({
	selector: 'tbody[q-grid-core-body]',
	templateUrl: './body-core.component.html'
})
export class BodyCoreComponent extends NgComponent implements OnInit {
	constructor(
		private element: ElementRef,
		public $view: ViewCoreService,
		public $table: TableCoreService,
		private root: RootService,
		private zone: NgZone
	) {
		super();
	}

	ngOnInit() {
		super.ngOnInit();

		const view = this.$view;
		const element = this.element.nativeElement as HTMLElement;

		const table = this.$table;
		const model = this.root.model;
    const scrollService = new ScrollService(model, this.root.table);
		const ctrl = new BodyCtrl(model, view, this.root.table, this.root.bag, scrollService);
		const listener = new EventListener(element, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			this.using(listener.on('wheel', e => ctrl.onWheel(e)));

			this.using(listener.on('scroll', () =>
				ctrl.onScroll({
					scrollLeft: table.pin ? model.scroll().left : element.scrollLeft,
					scrollTop: element.scrollTop
				}),
				{ passive: true }
			));

			this.using(listener.on('mousemove', ctrl.onMouseMove.bind(ctrl)));
			this.using(listener.on('mouseleave', ctrl.onMouseLeave.bind(ctrl)));
		});

		this.using(listener.on('mousedown', ctrl.onMouseDown.bind(ctrl)));
		this.using(listener.on('mouseup', ctrl.onMouseUp.bind(ctrl)));
	}

	get selection(): SelectionModel {
		return this.model.selection();
	}

	get model(): Model {
		return this.root.model;
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
