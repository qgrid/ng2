import {Renderer2, ElementRef} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';

export class Dom {

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
	}

	protected listen(selector: string | any, event: string, onEvent: Function) {
		let element = this.getElement(selector);

		this.renderer.listen(element, event, () => {
			setTimeout(onEvent, 200);
		});
	}

	protected getElement(selector: string | any) {
		let nativeElement = this.elementRef.nativeElement;
		return this.renderer.selectRootElement(selector);
	}
}
