import {
	Component,
	Input,
	ElementRef,
	AfterViewInit,
	NgZone,
	TemplateRef,
	ChangeDetectionStrategy,
	ViewChild,
} from '@angular/core';
import { ColumnSortPlugin } from '@qgrid/plugins/column-sort/column.sort.plugin';
import { EventListener } from '@qgrid/core/infrastructure/event.listener';
import { EventManager } from '@qgrid/core/infrastructure/event.manager';
import { ColumnModel } from '@qgrid/core/column-type/column.model';
import { FocusAfterRender } from '../focus/focus.service';
import { GridPlugin } from '@qgrid/ngx';

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

		const columnSort = new ColumnSortPlugin(this.plugin.model, {
			element: nativeElement,
			view: this.plugin.view,
			column: this.column,
			iconAsc,
			iconDesc
		});

		const listener = new EventListener(nativeElement, new EventManager(this));
		listener.on('click', () => {
			if (columnSort.onClick()) {
				const focus = new FocusAfterRender(this.plugin, null);
			}
		});

		this.zone.runOutsideAngular(() =>
			listener.on('mouseleave', () => columnSort.onMouseLeave())
		);
	}
}
