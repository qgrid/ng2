import { Directive, Input, ElementRef, NgZone } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Directive({
	selector: '[q-grid-menu]'
})
export class MenuDirective {
	// @Input('q-grid-menu') public trigger: MatMenuTrigger;

	constructor(element: ElementRef, zone: NgZone) {
		zone.runOutsideAngular(() =>
			element.nativeElement.addEventListener('click', e => e.stopPropagation())
		);
	}
}
