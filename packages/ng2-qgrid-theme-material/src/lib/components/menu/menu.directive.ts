import { Directive, ElementRef, NgZone } from '@angular/core';

@Directive({
	selector: '[q-grid-menu]'
})
export class MenuDirective {
	constructor(element: ElementRef, zone: NgZone) {
		zone.runOutsideAngular(() =>
			element.nativeElement.addEventListener('click', (e: MouseEvent) => e.stopPropagation())
		);
	}
}
