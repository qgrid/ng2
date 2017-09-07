import {Directive, OnInit, Input, Renderer2, ElementRef} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';

import {Dom} from '../dom/dom';

@Directive({
	selector: '[q-grid-on-blur]'
})
export class BlurDirective  extends Dom implements OnInit {

	@Input('q-grid-on-blur') onBlur: Function;
	@Input('q-grid-on-blur-selector') selector: string | any = 'input';

	constructor(renderer: Renderer2, elementRef: ElementRef) {
		super(renderer, elementRef);
	}

	ngOnInit() {
		this.listen(this.selector, 'blur', this.onBlur);
	}
}
