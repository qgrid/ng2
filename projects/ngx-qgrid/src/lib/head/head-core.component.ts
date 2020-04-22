import { Component, OnInit, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { GridView } from '../grid/grid-view';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { EventListener } from '@qgrid/core/infrastructure/event.listener';
import { EventManager } from '@qgrid/core/infrastructure/event.manager';
import { HeadCtrl } from '@qgrid/core/head/head.ctrl';
import { TableCoreService } from '../table/table-core.service';
import { GridRoot } from '../grid/grid-root';
import { Disposable } from '../infrastructure/disposable';

@Component({
	// tslint:disable-next-line
	selector: 'thead[q-grid-core-head]',
	templateUrl: './head-core.component.html',
	providers: [Disposable]
})
export class HeadCoreComponent implements OnInit {
	constructor(
		public $view: GridView,
		public $table: TableCoreService,
		private root: GridRoot,
		private elementRef: ElementRef,
		private zone: NgZone,
		private disposable: Disposable
	) {
	}

	ngOnInit() {
		const { model } = this.root;

		const element = this.elementRef.nativeElement;
		const ctrl = new HeadCtrl(model, this.$view, this.root.bag);
		const listener = new EventListener(element, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			this.disposable.add(listener.on('mousemove', e => ctrl.onMouseMove(e)));
			this.disposable.add(listener.on('mouseleave', e => ctrl.onMouseLeave(e)));
		});
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
