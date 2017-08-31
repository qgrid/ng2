import {Directive, Renderer2, ElementRef, OnInit, Input} from '@angular/core';
import {AppError} from '@grid/core/infrastructure';
import {ViewCoreService} from 'ng2-qgrid/main/core/view';

@Directive({
	selector: '[q-grid-blur]'
})
export class BlurDirective implements OnInit {

	@Input('q-grid-blur') onBlur: Function;

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
	}

	ngOnInit() {
		let nativeElement = this.elementRef.nativeElement;
		let inputElement = this.renderer.selectRootElement('input');

		if (!inputElement) {
			throw new AppError('blur.directive', `Required Input elemement is not found ` +
				`among the "${nativeElement.nodeName}" descendants.`);
		}

		this.renderer.listen(inputElement, 'blur', () => {
			setTimeout(this.onBlur, 200);
		});
	}
}
