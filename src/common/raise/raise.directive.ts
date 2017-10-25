import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Log } from 'ng2-qgrid/core/infrastructure';

@Directive({
	selector: '[q-grid-raise]'
})
export class RaiseDirective implements AfterViewInit {
	@Input('q-grid-raise') public type = 'click';

	constructor(private element: ElementRef) {}

	ngAfterViewInit() {
		const event = new Event(this.type);
		const rootElem = this.element.nativeElement;
		const raiseTarget = rootElem.attributes['q-grid-raise-target'];

		let raiseElem = raiseTarget ? rootElem.querySelector(raiseTarget.value) : rootElem;
		if (!raiseElem) {
			Log.warn('raise.directive', 'raise target not found');
			raiseElem = rootElem;
		}

		raiseElem.dispatchEvent(event);
	}
}
