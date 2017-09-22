import { Directive, Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure';

@Directive({
	selector: '[q-grid-focus]'
})
export class FocusDirective implements OnInit {
	@Input('q-grid-focus') selector;
	@Input('q-grid-focus-disabled') disabled: boolean = false;

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
	}

	ngOnInit() {
		if (this.disabled) {
			return;
		}

		if (!this.selector) {
			this.elementRef.nativeElement.focus();
		} else {
			const element = this.renderer.selectRootElement(this.selector);
			if (!element) {
				throw new AppError('focus.directive', `Element ${this.selector} is not found`);
			}

			element.focus();
		}
	}
}
