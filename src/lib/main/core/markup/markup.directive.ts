import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { RootService } from '../../../infrastructure/component/root.service';
import { TableCoreService } from '../table/table-core.service';

@Directive({
	selector: '[q-grid-markup]'
})
export class MarkupDirective implements OnInit, OnDestroy {
	@Input('q-grid-markup') name = '';

	constructor(
		private root: RootService,
		private element: ElementRef,
		private table: TableCoreService
	) {}

	ngOnInit() {
		this.root.markup[this.getName()] = this.element.nativeElement;
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
