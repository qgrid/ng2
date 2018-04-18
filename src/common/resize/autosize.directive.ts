import {Directive, ElementRef, OnInit, Input, Renderer2, NgZone} from '@angular/core';
import {Fastdom} from 'ng2-qgrid/core/services/fastdom';

@Directive({
	selector: '[q-grid-autosize]'
})
export class AutosizeDirective implements OnInit {
	@Input('q-grid-autosize') selector;
	@Input('q-grid-autosize-empty-width') emptyWidth = 75;
	private actualText = '';

	constructor(private element: ElementRef, private renderer: Renderer2, private zone: NgZone) {
	}

	ngOnInit() {
		this.zone.runOutsideAngular(() => {
			const owner = this.element.nativeElement as HTMLInputElement;
			const element = this.selector ? owner.querySelector(this.selector) as HTMLInputElement : owner;

			this.renderer.listen(element, 'input', () => this.autoWidth());
		});
	}

	autoWidth() {
		const owner = this.element.nativeElement as HTMLInputElement;
		const element = this.selector ? owner.querySelector(this.selector) as HTMLInputElement : owner;
		const text = element.value;

		if (!text) {
			this.actualText = text;
			Fastdom.mutate(() => {
				owner.style.width = `${this.emptyWidth}px`;
			});
			return;
		}

		if (!element) {
			return;
		}

		if (this.actualText === text) {
			return;
		}

		this.actualText = text;
		Fastdom.measure(() => {
			const width = `${this.calculateWidth(element, text)}px`;
			Fastdom.mutate(() => owner.style.width = width);
		});
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
