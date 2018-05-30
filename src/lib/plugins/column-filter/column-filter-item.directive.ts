import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ColumnFilterItemListDirective } from './column-filter-item-list.directive';

@Directive({
	selector: '[q-grid-column-filter-item]'
})
export class ColumnFilterItemDirective implements OnInit {
	@Input('q-grid-column-filter-item') value: any;

	$implicit = this;

	constructor(
		private viewContainerRef: ViewContainerRef,
		private itemList: ColumnFilterItemListDirective
	) {
	}

	ngOnInit() {
		const itemList = this.itemList;
		const link = itemList.cellService.build('column-filter', itemList.column);
		link(this.viewContainerRef, this);
	}
}
