import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
	selector: '[q-grid-autosize]'
})
export class AutosizeDirective {
	@Input('q-grid-autosize') selector;
	private actualWidth = 0;
	private actualText = '';

	constructor(private element: ElementRef) {
	}

	autoWidth(text: string) {
		const owner = this.element.nativeElement as HTMLElement;
		const element = this.selector ? owner.querySelector(this.selector) as HTMLElement : owner;
		if (!element) {
			return this.actualWidth;
		}

		if (this.actualText === text) {
			return this.actualWidth;
		}

		this.actualText = text;
		this.actualWidth = this.calculateWidth(element, text);
		return this.actualWidth;
	}

	private calculateWidth(element: HTMLElement, text: string) {
		let width = 0;
		if (text) {
			const document = element.ownerDocument;
			const body = document.body;
			const test = document.createElement('span');

			test.innerText = text;
			test.style.whiteSpace = 'pre';
			test.style.visibility = 'hidden';
			test.style.font = element.style.font;
			test.style.fontFamily = element.style.fontFamily;
			test.style.lineHeight = element.style.lineHeight;
			test.style.border = element.style.border;
			// borderBox ?

			document.body.appendChild(test);
			width = test.offsetWidth;
			test.remove();
		}

		return width;
	}
}
