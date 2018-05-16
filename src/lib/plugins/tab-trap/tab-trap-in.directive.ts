import { Directive, Input, ElementRef, NgZone } from '@angular/core';

@Directive({
	selector: '[q-grid-tab-trap-in]'
})
export class TabtrapInDirective {
	constructor(element: ElementRef, zone: NgZone) {
	}
}
