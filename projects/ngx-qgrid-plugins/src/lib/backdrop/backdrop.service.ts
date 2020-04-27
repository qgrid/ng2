import { Injectable, ElementRef } from '@angular/core';
import { Guard } from '@qgrid/core/infrastructure/guard';

@Injectable()
export class BackdropService {
	isActive = true;
	element: ElementRef;

	hide() {
		Guard.notNull(this.element, 'element');

		if (this.isActive) {
			this.element.nativeElement.classList.add('q-grid-backdrop-inactive');
			this.isActive = false;
		}
	}

	reveal() {
		Guard.notNull(this.element, 'element');

		if (!this.isActive) {
			this.element.nativeElement.classList.remove('q-grid-backdrop-inactive');
			this.isActive = true;
		}
	}
}
