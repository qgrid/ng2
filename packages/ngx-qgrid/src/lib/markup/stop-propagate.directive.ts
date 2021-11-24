import { Directive, ElementRef, Input, OnInit, Renderer2, NgZone } from '@angular/core';
import { yes, isString } from '@qgrid/core/utility/kit';

@Directive({
	selector: '[q-grid-stop-propagate]'
})
export class StopPropagateDirective implements OnInit {
	@Input('q-grid-stop-propagate') eventName: string | Array<string> = 'click';

	// tslint:disable-next-line:no-input-rename
	@Input('q-grid-stop-propagate-when') needStop = yes;

	constructor(
		private element: ElementRef,
		private renderer: Renderer2,
		private zone: NgZone) {
	}

	ngOnInit() {
		let eventNames = this.eventName as Array<string>;
		if (isString(this.eventName)) {
			eventNames = [this.eventName as string];
		}

		this.zone.runOutsideAngular(() =>
			eventNames.forEach(eventName =>
				this.renderer.listen(
					this.element.nativeElement,
					eventName,
					e => {
						if (this.needStop()) {
							e.stopPropagation();
						}
					})
			)
		);
	}
}
