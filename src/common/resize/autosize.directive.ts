import {Directive, ElementRef, OnInit, Input, Renderer2, NgZone, DoCheck} from '@angular/core';
import {Fastdom} from 'ng2-qgrid/core/services/fastdom';
import {isUndefined} from 'ng2-qgrid/core/utility/index';

@Directive({
	selector: '[q-grid-autosize]'
})
export class AutosizeDirective implements OnInit, DoCheck {
	@Input('q-grid-autosize') selector;
	@Input('q-grid-autosize-empty-width') emptyWidth = 75;
	private actualText: string;
	private host: HTMLElement;
	private element: HTMLInputElement;

	constructor(element: ElementRef, private renderer: Renderer2, private zone: NgZone) {
		this.host = element.nativeElement as HTMLInputElement;
	}

	ngOnInit() {
		this.element = this.selector ? this.host.querySelector(this.selector) as HTMLInputElement : this.host as HTMLInputElement;
		this.zone.runOutsideAngular(() => {
			this.renderer.listen(this.element, 'input', () => this.autoWidth());
		});
	}

	ngDoCheck() {
		if (isUndefined(this.actualText)) {
			if (this.element.value) {
				this.autoWidth();
			}
		}
	}

	autoWidth() {
		const text = this.element.value;

		if (!text) {
			this.actualText = text;
			Fastdom.mutate(() => {
				this.host.style.width = `${this.emptyWidth}px`;
			});
			return;
		}

		if (!this.element) {
			return;
		}

		if (this.actualText === text) {
			return;
		}

		this.actualText = text;
		Fastdom.measure(() => {
			const width = `${this.calculateWidth(this.element, text)}px`;
			Fastdom.mutate(() => this.host.style.width = width);
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

			body.appendChild(test);
			width = test.offsetWidth;
			test.remove();
		}

		return width;
	}
}
