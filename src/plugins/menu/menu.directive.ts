import { Directive, ViewChild, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Directive({
	selector: 'q-grid-menu'
})
export class MenuDirective {
	@Input('q-grid-menu') public trigger: MatMenuTrigger;

	constructor() {
	}

	ngOnInit() {

	}

	ngAfterViewInit() {
		debugger;
	}
}
