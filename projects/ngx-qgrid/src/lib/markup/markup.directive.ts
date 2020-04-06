import { Directive, ElementRef, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { GridRoot } from '../grid/grid-root';
import { TableCoreService } from '../table/table-core.service';

@Directive({
	selector: '[q-grid-markup]'
})
export class MarkupDirective implements OnInit, OnDestroy {
	@Input('q-grid-markup') name = '';

	constructor(
		private root: GridRoot,
		private elementRef: ElementRef,
		@Optional() private table: TableCoreService
	) {}

	ngOnInit() {
		this.root.markup[this.getName()] = this.elementRef.nativeElement;
	}

	ngOnDestroy() {
		delete this.root.markup[this.getName()];
	}

	private getName() {
		if (this.table && this.table.pin) {
			return `${this.name}-${this.table.pin}`;
		}

		return this.name;
	}
}
