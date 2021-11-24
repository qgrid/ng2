import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { CellClassService } from '../cell/cell-class.service';

@Directive({
	selector: '[q-grid-core-td-align]',
})
export class TdCoreAlignDirective implements OnInit {
	@Input('q-grid-core-td-align') columnView: ColumnView;

	constructor(
		private elementRef: ElementRef,
		private cellClass: CellClassService,
		) {
	}

	ngOnInit() {
		this.cellClass.toBody(this.elementRef.nativeElement, this.columnView.model);
	}
}
