import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[q-grid-raise]'
})
export class RaiseDirective implements AfterViewInit {
	@Input('q-grid-raise') public type = 'click';

	constructor(private element: ElementRef) {}

	ngAfterViewInit() {
		const event = new Event(this.type);
		this.element.nativeElement.dispatchEvent(event);
	}
}
