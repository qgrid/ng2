import { Component, Input } from '@angular/core';

@Component({
	selector: 'q-grid-column-filter-trigger',
	templateUrl: './column-filter-trigger.component.html'
})
export class ColumnFilterTriggerComponent {
	@Input() public column;

	constructor() {
	}
}
