import {Renderer2, ElementRef} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';

export class DomBase {
	name = 'dom-events';

	constructor(private renderer: Renderer2, private elementRef: ElementRef) {
	}

	protected listen(selector: string | any, event: string, onEvent: Function) {
		let element = this.selectRootElement(selector);

		this.renderer.listen(element, event, () => {
			setTimeout(onEvent, 200);
		});
	}

	protected selectRootElement(selector: string | any) {
		let nativeElement = this.elementRef.nativeElement;
		let element = this.renderer.selectRootElement(selector);
		if (!element) {
			throw new AppError('dom-base', `Required elemement is not found ` +
				`among the "${nativeElement.nodeName}" descendants.`);
		}
		return element;
	}
}
