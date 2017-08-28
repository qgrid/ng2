import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {GRID_PREFIX} from '@grid/core/definition';
import {RootService} from '@grid/infrastructure/component';

@Directive({
	selector: '[q-grid-core-align-td]',
})
export class TdCoreAlignDirective implements OnInit {
	@Input('q-grid-core-column-index') columnIndex: number;
	element: HTMLElement;

	constructor(private root: RootService,
					element: ElementRef) {

		this.element = element.nativeElement;
	}

	ngOnInit() {
		const column = this.column;
		const element = this.element;

		element.classList.add(`${GRID_PREFIX}-${column.key}`);
		element.classList.add(`${GRID_PREFIX}-${column.type}`);
		if (column.editor) {
			element.classList.add(`${GRID_PREFIX}-${column.editor}`);
		}
	}

	get column() {
		const columns = this.root.table.data.columns();
		return columns[this.columnIndex];
	}
}
