import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure';

@Directive({
	selector: '[q-grid-raise]'
})
export class RaiseDirective implements AfterViewInit {
	@Input('q-grid-raise') public type = 'click';
	@Input('q-grid-raise-target') public target:string;

	constructor(private element: ElementRef) {}

	ngAfterViewInit() {
		const event = new Event(this.type);
		const rootElem = this.element.nativeElement;

		let raiseElem = this.target ? rootElem.querySelector(this.target) : rootElem;
		if (!raiseElem) {
			throw new AppError('raise.directive', 'raise target not found');
		}

		raiseElem.dispatchEvent(event);
	}
}
