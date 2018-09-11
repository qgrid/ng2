import { Injectable, Renderer2, ElementRef } from '@angular/core';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { jobLine } from 'ng2-qgrid/core/services/job.line';

@Injectable()
export class BackdropService {
	element: ElementRef;
	isVisible = true;
	job = jobLine(300);

	hide() {
		Guard.notNull(this.element, 'element');
		if (this.isVisible) {
			this.element.nativeElement.classList.add('q-grid-backdrop-inactive');
			this.isVisible = false;
		}
	}

	reveal() {
		Guard.notNull(this.element, 'element');
		if (!this.isVisible) {
			this.job(() => this.element.nativeElement.classList.remove('q-grid-backdrop-inactive'));
			this.isVisible = true;
		}
	}
}
