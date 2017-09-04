import {Directive, OnInit, Input, Renderer2, ElementRef} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';

import {DomBase} from './dom-base';

@Directive({
	selector: '[input-on-blur]'
})
export class InputBlurDirective  extends DomBase implements OnInit {

	@Input('input-on-blur') onBlur: Function;

	constructor(renderer: Renderer2, elementRef: ElementRef) {
		super(renderer, elementRef);
	}

	ngOnInit() {
		this.listen('input', 'blur', this.onBlur);
	}
}
