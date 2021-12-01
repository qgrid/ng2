import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone,
  TemplateRef, ViewChild
} from '@angular/core';
import { ColumnModel, EventListener, EventManager } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';
import { ColumnSortPlugin } from '@qgrid/plugins';
import { FocusAfterRender } from '../focus/focus.service';

@Component({
	selector: 'q-grid-column-sort',
	templateUrl: './column-sort.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnSortComponent implements AfterViewInit {
	@ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
	@Input() column: ColumnModel;

	context: { $implicit: ColumnSortComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private elementRef: ElementRef,
		private zone: NgZone,
	) {
	}

	ngAfterViewInit() {
		const { nativeElement } = this.elementRef;
		const iconAsc = nativeElement.querySelector('.q-grid-asc');
		const iconDesc = nativeElement.querySelector('.q-grid-desc');

		const columnSort = new ColumnSortPlugin(this.plugin, {
			element: nativeElement,
			column: this.column,
			iconAsc,
			iconDesc
		});

		const listener = new EventListener(nativeElement, new EventManager(this));
		listener.on('click', () => {
			if (columnSort.click()) {
				// tslint:disable-next-line:no-unused-expression
				new FocusAfterRender(this.plugin);
			}
		});

		this.zone.runOutsideAngular(() =>
			listener.on('mouseleave', () => columnSort.mouseLeave())
		);
	}
}
