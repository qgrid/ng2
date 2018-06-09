import {
	Directive,
	Renderer2,
	ElementRef,
	OnInit,
	Input,
	AfterViewInit,
	NgZone
} from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { isString } from 'ng2-qgrid/core/utility/kit';

@Directive({
	selector: '[q-grid-focus]'
})
export class FocusDirective implements AfterViewInit {
	@Input('q-grid-focus') selector;

	constructor(private element: ElementRef, private zone: NgZone) { }

	ngAfterViewInit() {
		const selector = this.selector;
		const element = selector
			? isString(selector) ? this.element.nativeElement.querySelector(selector) : selector
			: this.element.nativeElement;

		if (!element) {
			throw new AppError(
				'focus.directive',
				`Element ${this.selector} is not found`
			);
		}

		// we need a small timeout to wait, for example, position directive
		// in other case it will scroll to element before layout
		this.zone.runOutsideAngular(() => setTimeout(() => element.focus(), 10));
	}
}
