import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { ColumnModel } from 'ng2-qgrid/core/column-type/column.model';

@Component({
	selector: 'q-grid-column-filter-by',
	templateUrl: './column-filter-by.component.html'
})
export class ColumnFilterByComponent {
	@Input() by: Set<string>;
	@Input() column: ColumnModel;
	@Input() byBlanks: boolean;

	@Output() byBlanksChange = new EventEmitter();

	context: { $implicit: ColumnFilterByComponent } = {
		$implicit: this
	};


	constructor() {
	}

	get isBlanks() {
		return this.byBlanks;
	}

	remove(item: string): void {
		this.by.delete(item);
	}

	removeByBlanks() {
		this.byBlanksChange.emit(false);
	}
}
