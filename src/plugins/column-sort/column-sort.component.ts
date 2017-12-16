import { Component, Input, Optional, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { ColumnSortView } from 'ng2-qgrid/plugin/column-sort/column.sort.view';

@Component({
	selector: 'q-grid-column-sort',
	templateUrl: './column-sort.component.html'
})
export class ColumnSortComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input() public column;

	constructor(root: RootService, private element: ElementRef) {
		super(root);
	}

	ngOnInit() {
		const nativeElement = this.element.nativeElement;
		const iconAsc = nativeElement.querySelector('.q-grid-asc');
		const iconDesc = nativeElement.querySelector('.q-grid-desc');

		this.context = {
			$implicit: new ColumnSortView(this.model, {
				element: nativeElement,
				view: this.root.view,
				column: this.column,
				iconAsc,
				iconDesc
			})
		};
	}

	ngOnDestroy() {
		this.context.$implicit.dispose();
	}
}
