import {
	Directive,
	Renderer2,
	ElementRef,
	OnInit,
	Input,
	AfterViewInit
} from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure';

@Directive({
	selector: '[q-grid-focus]'
})
export class FocusDirective implements AfterViewInit {
	@Input('q-grid-focus') selector;

	constructor(private elementRef: ElementRef) {}

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

		element.focus();
	}
}
