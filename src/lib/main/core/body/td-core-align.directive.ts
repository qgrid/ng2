import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';
import { TdCtrl } from 'ng2-qgrid/core/cell/td.ctrl';
import { ColumnView } from 'ng2-qgrid/core/scene/view/column.view';

const classify = TdCtrl.classify;

@Directive({
	selector: '[q-grid-core-td-align]',
})
export class TdCoreAlignDirective implements OnInit {
	@Input('q-grid-core-td-align') public columnView: ColumnView;

	constructor(private element: ElementRef) {
	}

	ngOnInit() {
		classify(this.element.nativeElement, this.columnView.model);
	}
}
