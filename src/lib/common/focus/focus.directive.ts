import {
	Directive,
	ElementRef,
	Input,
	AfterViewInit,
	NgZone
} from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { isString, isFunction } from 'ng2-qgrid/core/utility/kit';

@Directive({
	selector: '[q-grid-focus]'
})
export class FocusDirective implements AfterViewInit {
	@Input('q-grid-focus') selector;
	@Input('q-grid-focus-disabled') disabled = false;

	constructor(private element: ElementRef, private zone: NgZone) { }

	ngAfterViewInit() {
		if (this.disabled) {
			return;
		}

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

		if (!isFunction(element.focus)) {
			throw new AppError(
				'focus.directive',
				`Can't find focus method in ${element}`
			);
		}

		// we need a small timeout to wait, for example, position directive
		// in other case it will scroll to element before layout
		this.zone.runOutsideAngular(() => setTimeout(() => element.focus(), 10));
	}
}
