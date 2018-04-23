import {Output, EventEmitter, Directive, Input, NgZone, Inject} from '@angular/core';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {take} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';

@Directive({
	selector: '[q-grid-backdrop]'
})
export class BackdropDirective {
	@Input('q-grid-backdrop-selector') selector = '';
	@Output('q-grid-backdrop') close = new EventEmitter<any>();
	private backdrop: HTMLElement;

	constructor(private zone: NgZone, @Inject(DOCUMENT) document: any) {
	}

	@Input('q-grid-backdrop-active')
	set backdropHost(value: any) {
		if (value && this.backdrop) {
			return;
		}

		if (!value) {
			return;
		}
		this.backdrop = document.createElement('div');
		this.backdrop.classList.add('q-grid-backdrop');
		this.backdrop.style.zIndex = '1000';

		fromEvent(this.backdrop, 'click')
			.pipe(take(1))
			.subscribe(() => {
				this.zone.runOutsideAngular(() => {
					this.close.emit();
					this.backdrop.remove();
					this.backdrop = null;
				});
			});

		this.zone.runOutsideAngular(() => {
			const element = <HTMLElement>document.querySelector(this.selector);

			element.style.zIndex = '1001';
			element.parentElement.appendChild(this.backdrop);
		});
	}
}
