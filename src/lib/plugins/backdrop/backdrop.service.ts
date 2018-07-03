import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class BackdropService {
	element: HTMLElement;
	visibile = true;

	constructor(private renderer: Renderer2) {}

	hide() {
		this.renderer.removeClass(this.element, 'q-grid-backdrop-active');
		this.renderer.addClass(this.element, 'q-grid-backdrop-inactive');
		this.visibile = false;
	}

	reveal() {
		this.renderer.removeClass(this.element, 'q-grid-backdrop-inactive');
		this.renderer.addClass(this.element, 'q-grid-backdrop-active');
		this.visibile = true;
	}
}
