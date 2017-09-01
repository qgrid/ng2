import {Directive, OnInit, Input, Renderer2, ElementRef} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';

import {DomEventsBase} from './dom-events-base';

@Directive({
	selector: '[input-on-blur]'
})
export class InputBlurDirective  extends DomEventsBase implements OnInit {

	@Input('input-on-blur') onBlur: Function;

	constructor(renderer: Renderer2, elementRef: ElementRef) {
		super(renderer, elementRef);
	}

	ngOnInit() {
		this.listen('input', 'blur', this.onBlur);
	}
}
