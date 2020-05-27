import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { isArray } from '@qgrid/core/utility/kit';

@Directive({
	selector: '[q-grid-stop-propagate]'
})
export class StopPropagateDirective implements OnInit {
	@Input('q-grid-stop-propagate') events;

	constructor(private elementRef: ElementRef) {
	}

	ngOnInit() {
		let { events } = this;
		if (!isArray(events)) {
			events = [events];
		}

		events.forEach(eventName =>
			this.elementRef.nativeElement.addEventListener(eventName, e =>
				e.stopPropagation()
			));
	}
}
