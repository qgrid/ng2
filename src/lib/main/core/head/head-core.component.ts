import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { ViewCoreService } from '../view/view-core.service';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { HeadCtrl } from 'ng2-qgrid/core/head/head.ctrl';
import { TableCoreService } from '../table/table-core.service';
import { RootService } from '../../../infrastructure/component/root.service';
import { NgComponent } from '../../../infrastructure/component/ng.component';

@Component({
	selector: 'thead[q-grid-core-head]',
	templateUrl: './head-core.component.html'
})
export class HeadCoreComponent extends NgComponent implements OnInit {
	constructor(
		public $view: ViewCoreService,
		public $table: TableCoreService,
		private root: RootService,
		private element: ElementRef,
		private zone: NgZone
	) {
		super();
	}
    
	ngOnInit() {
		const element = this.element.nativeElement;
		const ctrl = new HeadCtrl(this.root.model, this.$view, this.root.bag);
		const listener = new EventListener(element, new EventManager(this));
		this.zone.runOutsideAngular(() => {
			listener.on('mousemove', e => ctrl.onMouseMove(e));
			listener.on('mouseleave', e => ctrl.onMouseLeave(e));
		});
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
