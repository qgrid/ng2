import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { GridLet } from '../grid/grid-let';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { HeadHost } from '@qgrid/core/head/head.host';
import { TableCoreService } from '../table/table-core.service';
import { GridPlugin } from '../plugin/grid-plugin';

@Component({
	// tslint:disable-next-line
	selector: 'thead[q-grid-core-head]',
	templateUrl: './head-core.component.html',
	providers: [GridPlugin]
})
export class HeadCoreComponent implements OnInit {
	constructor(
		public $view: GridLet,
		public $table: TableCoreService,
		private elementRef: ElementRef,
		private plugin: GridPlugin,
		private zone: NgZone
	) {
	}

	ngOnInit() {
		const { disposable } = this.plugin;

		const element = this.elementRef.nativeElement;
		const host = new HeadHost(this.plugin);

		const listener = new EventListener(element, new EventManager(this));
		this.zone.runOutsideAngular(() => {
			disposable.add(listener.on('mousemove', e => host.mouseMove(e)));
			disposable.add(listener.on('mouseleave', e => host.mouseLeave(e)));
		});
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number) {
		return index;
	}
}
