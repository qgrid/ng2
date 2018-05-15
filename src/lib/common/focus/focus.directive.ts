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

@Directive({
	selector: '[q-grid-focus]'
})
export class FocusDirective implements AfterViewInit {
	@Input('q-grid-focus') selector;

	constructor(private elementRef: ElementRef, private zone: NgZone) { }

	ngAfterViewInit() {
		const element = this.selector
			? this.elementRef.nativeElement.querySelector(this.selector)
			: this.elementRef.nativeElement;

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
