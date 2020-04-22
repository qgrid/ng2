import {
	Directive,
	ElementRef,
	Input,
	AfterViewInit,
	NgZone,
} from '@angular/core';
import { GridError } from '@qgrid/ngx';
import { isString, isFunction } from '@qgrid/core/utility/kit';

@Directive({
	selector: '[q-grid-focus]'
})
export class FocusDirective implements AfterViewInit {
	@Input('q-grid-focus') selector;
	@Input('q-grid-focus-disabled') disabled = false;

	constructor(
		private elementRef: ElementRef,
		private zone: NgZone
	) { }

	ngAfterViewInit() {
		if (this.disabled) {
			return;
		}

		const selector = this.selector;
		const element = selector
			? isString(selector) ? this.elementRef.nativeElement.querySelector(selector) : selector
			: this.elementRef.nativeElement;

		if (!element) {
			throw new GridError(
				'focus.directive',
				`Element ${this.selector} is not found`
			);
		}

		if (!isFunction(element.focus)) {
			throw new GridError(
				'focus.directive',
				`Can't find focus method in ${element}`
			);
		}

		// we need a small timeout to wait, for example, position directive
		// in other case it will scroll to element before layout
		this.zone.runOutsideAngular(() =>
			setTimeout(() => {
				element.focus();
			}, 10));
	}
}
