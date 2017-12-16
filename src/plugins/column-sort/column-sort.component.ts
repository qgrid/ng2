import { Component, Input, Optional, ElementRef, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ColumnSortView } from 'ng2-qgrid/plugin/column-sort/column.sort.view';

@Component({
	selector: 'q-grid-column-sort',
	templateUrl: './column-sort.component.html'
})
export class ColumnSortComponent extends PluginComponent implements AfterViewInit, OnDestroy {
	@Input() public column;

	constructor(root: RootService, private element: ElementRef, private zone: NgZone) {
		super(root);
	}

	ngAfterViewInit() {
		const nativeElement = this.element.nativeElement;
		const iconAsc = nativeElement.querySelector('.q-grid-asc');
		const iconDesc = nativeElement.querySelector('.q-grid-desc');

		this.zone.runOutsideAngular(() => {
			const ctrl = new ColumnSortView(this.model, {
				element: nativeElement,
				view: this.root.view,
				column: this.column,
				iconAsc,
				iconDesc
			});

			this.context = {
				$implicit: ctrl
			};
		});
	}

	ngOnDestroy() {
		this.context.$implicit.dispose();
	}
}
