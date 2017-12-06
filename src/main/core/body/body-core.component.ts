import { Component, ElementRef, OnDestroy, OnInit, NgZone } from '@angular/core';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { NgComponent, RootService } from 'ng2-qgrid/infrastructure/component';
import { PathService } from 'ng2-qgrid/core/path';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { SelectionModel } from 'ng2-qgrid/core/selection/selection.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { ViewCoreService } from '../view/view-core.service';
import { TableCoreService } from '../table/table-core.service';
import { BodyCtrl } from 'ng2-qgrid/core/body/body.ctrl';

@Component({
	selector: 'tbody[q-grid-core-body]',
	templateUrl: './body-core.component.html'
})
export class BodyCoreComponent extends NgComponent implements OnInit, OnDestroy {
	private element: Element = null;
	private rangeStartCell = null;
	private scrollContext = {
		top: 0,
		left: 0
	};

	constructor(element: ElementRef,
		public $view: ViewCoreService,
		public $table: TableCoreService,
		private root: RootService,
		private zone: NgZone) {
		super();

		this.element = element.nativeElement;
	}

	ngOnInit() {
		super.ngOnInit();

		const view = this.$view;
		const element = this.element as HTMLElement;

		const ctrl = new BodyCtrl(view, this.root.bag);
		const listener = new EventListener(this.element, new EventManager(this, view.invoke));

		this.zone.runOutsideAngular(() => {
			this.using(listener.on('scroll', () => ctrl.onScroll({
				scrollTop: element.scrollTop,
				scrollLeft: element.scrollLeft
			}), { passive: true }));

			this.using(listener.on('wheel', e => ctrl.onWheel({
				deltaY: e.deltaY,
				scrollHeight: element.scrollHeight,
				offsetHeight: element.offsetHeight
			})));
			this.using(listener.on('mousemove', ctrl.onMouseMove.bind(ctrl)));
			this.using(listener.on('mouseleave', ctrl.onMouseLeave.bind(ctrl)));
		});

		this.using(listener.on('mousedown', ctrl.onMouseDown.bind(ctrl)));
		this.using(listener.on('mouseup', ctrl.onMouseUp.bind(ctrl)));
		this.using(listener.on('click', ctrl.onClick.bind(ctrl)));
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
