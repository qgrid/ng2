import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { GridError } from '@qgrid/ngx';

@Directive({
	selector: '[q-grid-raise]'
})
export class RaiseDirective implements AfterViewInit {
	@Input('q-grid-raise') type = 'click';
	@Input('q-grid-raise-target') target: string;

	constructor(private element: ElementRef) {}

	ngAfterViewInit() {
		const event = new Event(this.type);
		const element = this.element.nativeElement;

		const target = this.target
			? element.querySelector(this.target)
			: element;

		if (!target) {
			throw new GridError('raise.directive', 'raise target is not found');
		}

		target.dispatchEvent(event);
	}
}
