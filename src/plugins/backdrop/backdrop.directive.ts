import {Output, EventEmitter, Directive, Input} from '@angular/core';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {take} from 'rxjs/operators';
import {Fastdom} from 'ng2-qgrid/core/services/fastdom';

@Directive({
	selector: '[q-grid-backdrop]'
})
export class BackdropDirective {
	@Input('q-grid-backdrop-host') element: any;
	@Output('q-grid-backdrop') close = new EventEmitter<any>();
	private backdrop: HTMLElement;

	constructor() {
	}

	@Input('q-grid-backdrop-is-active')
	set isActive(value: boolean) {
		if (value && this.backdrop) {
			return;
		}

		if (!value) {
			return;
		}

		Fastdom.measure(() => {
			this.backdrop = document.createElement('div');
			this.backdrop.classList.add('q-grid-backdrop');
			this.backdrop.style.zIndex = '1000';

			fromEvent(this.backdrop, 'click')
				.pipe(take(1))
				.subscribe(() => {
					Fastdom.mutate(() => {
						this.close.emit();
						this.backdrop.remove();
						this.backdrop = null;
					});
				});

			Fastdom.mutate(() => {
				this.element.nativeElement.style.zIndex = '1001';
				this.element.nativeElement.parentElement.appendChild(this.backdrop);
			});
		});
	}
}
