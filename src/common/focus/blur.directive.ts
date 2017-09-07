import {Directive, OnInit, Input, Renderer2, ElementRef} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';

import {DomService} from 'ng2-qgrid/common/dom/dom.service';

@Directive({
	selector: '[q-grid-on-blur]'
})
export class BlurDirective  implements OnInit {

	@Input('q-grid-on-blur') onBlur: Function;
	@Input('q-grid-on-blur-selector') selector: string | any = 'input';

	private domService: DomService;

	constructor(renderer: Renderer2, elementRef: ElementRef) {
		this.domService = new DomService(renderer, elementRef);
	}

	ngOnInit() {
		this.domService.listen(this.selector, 'blur', this.onBlur);
	}
}
