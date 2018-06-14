import { Directive, ViewChild, AfterViewInit, ContentChild } from '@angular/core';
import { MatSelect } from '@angular/material';

@Directive({
	selector: '[q-grid-select]'
})
export class SelectDirective implements AfterViewInit {
	@ContentChild(MatSelect) public input: MatSelect;

	constructor() {}

	ngAfterViewInit() {
		Promise.resolve(null).then(() => this.input.open());
	}
}
