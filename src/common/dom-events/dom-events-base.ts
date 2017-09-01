import { Renderer2, ElementRef} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';

export class DomEventsBase {
	name = 'dom-events';

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
	}

	listen(selector: string | any, event: string, onEvent: Function) {
		let nativeElement = this.elementRef.nativeElement;
		let inputElement = this.renderer.selectRootElement(selector);

		if (!inputElement) {
			throw new AppError('blur.directive', `Required Input elemement is not found ` +
				`among the "${nativeElement.nodeName}" descendants.`);
		}

		this.renderer.listen(inputElement, event, () => {
			setTimeout(onEvent, 200);
		});
	}
}
