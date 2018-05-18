import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';

@Directive({
	selector: '[q-grid-raise]'
})
export class RaiseDirective implements AfterViewInit {
	@Input('q-grid-raise') public type = 'click';
	@Input('q-grid-raise-target') public target: string;

	constructor(private element: ElementRef) {}

	ngAfterViewInit() {
		const event = new Event(this.type);
		const element = this.element.nativeElement;

		const target = this.target
			? element.querySelector(this.target)
			: element;

		if (!target) {
			throw new AppError('raise.directive', 'raise target is not found');
		}

		target.dispatchEvent(event);
	}
}
