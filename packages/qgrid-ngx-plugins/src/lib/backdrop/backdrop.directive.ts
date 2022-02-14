import { Output, EventEmitter, Directive, Input, NgZone, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
	selector: '[q-grid-backdrop]'
})
export class BackdropDirective {
	@Input('q-grid-backdrop-selector') selector = '';
	@Output('q-grid-backdrop') close = new EventEmitter<any>();
	private backdrop: HTMLElement;

	constructor(private zone: NgZone, @Inject(DOCUMENT) private document: any) {
	}

	@Input('q-grid-backdrop-active')
	set backdropHost(value: any) {
		if (!value) {
			if (this.backdrop) {
				this.backdrop.remove();
				this.backdrop = null;
			}

			return;
		}
		this.backdrop = this.document.createElement('div');
		this.backdrop.classList.add('q-grid-backdrop');
		this.backdrop.style.zIndex = '1000';

		this.zone.runOutsideAngular(() => {
			this.backdrop.addEventListener('click', () => {
				if (this.backdrop) {
					this.backdrop.remove();
					this.backdrop = null;
					this.close.emit();
				}
			});
		});

		this.zone.runOutsideAngular(() => {
			const element = <HTMLElement>document.querySelector(this.selector);

			element.style.zIndex = '1001';
			element.parentElement.appendChild(this.backdrop);
		});
	}
}
