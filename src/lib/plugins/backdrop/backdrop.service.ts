import { Injectable, Renderer2 } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';

@Injectable()
export class BackdropService {
	element: HTMLElement;
	isVisible = true;

	constructor(private renderer: Renderer2) { }

	hide() {
		Guard.notNull(this.element, 'element');

		this.renderer.addClass(this.element, 'q-grid-backdrop-inactive');
		this.isVisible = false;
	}

	reveal() {
		Guard.notNull(this.element, 'element');

		this.renderer.removeClass(this.element, 'q-grid-backdrop-inactive');
		this.isVisible = true;
	}
}
