import { ElementRef, Injectable } from '@angular/core';
import { Guard } from '@qgrid/core';

@Injectable()
export class BackdropService {
	isActive = true;
	element!: ElementRef | null;

	hide() {
		Guard.notNull(this.element, 'element');

		if (this.isActive) {
			if (this.element) {
				this.element.nativeElement.classList.add('q-grid-backdrop-inactive');
			}
			this.isActive = false;
		}
	}

	reveal() {
		Guard.notNull(this.element, 'element');

		if (!this.isActive) {
			if (this.element) {
				this.element.nativeElement.classList.remove('q-grid-backdrop-inactive');
			}
			this.isActive = true;
		}
	}
}
