import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TdCtrl } from '@qgrid/core/cell/td.ctrl';
import { ColumnView } from '@qgrid/core/scene/view/column.view';

const classify = TdCtrl.classify;

@Directive({
	selector: '[q-grid-core-td-align]',
})
export class TdCoreAlignDirective implements OnInit {
	@Input('q-grid-core-td-align') columnView: ColumnView;

	constructor(private elementRef: ElementRef) {
	}

	ngOnInit() {
		classify(this.elementRef.nativeElement, this.columnView.model);
	}
}
