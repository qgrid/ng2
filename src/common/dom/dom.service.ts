import { Renderer2, ElementRef } from '@angular/core';

export class DomService {

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
	}

	listen(selector: string | any, event: string, onEvent: Function) {
		let element = this.getElement(selector);

		this.renderer.listen(element, event, () => {
			setTimeout(onEvent, 200);
		});
	}

	getElement(selector: string | any) {
		let nativeElement = this.elementRef.nativeElement;
		return this.renderer.selectRootElement(selector);
	}
}
