import { Directive, ElementRef, Input, OnInit, Optional } from '@angular/core';
import { TableCoreService } from '../table/table-core.service';
import { GridPlugin } from '../plugin/grid-plugin';

@Directive({
	selector: '[q-grid-markup]',
	providers: [GridPlugin]
})
export class MarkupDirective implements OnInit {
	@Input('q-grid-markup') name = '';

	constructor(
		private plugin: GridPlugin,
		private elementRef: ElementRef,
		@Optional() private table: TableCoreService
	) { }

	ngOnInit() {
		const { table, disposable } = this.plugin;
		table.box.markup[this.getName()] = this.elementRef.nativeElement;

		disposable.add(() => delete table.box.markup[this.getName()]);
	}

	private getName() {
		if (this.table && this.table.pin) {
			return `${this.name}-${this.table.pin}`;
		}

		return this.name;
	}
}
