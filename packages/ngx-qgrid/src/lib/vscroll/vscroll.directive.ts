import { Directive, ElementRef, EventEmitter, NgZone, Renderer2 } from '@angular/core';
import { placeholderBitmap } from './vscroll.utility';

@Directive({
	selector: '[q-grid-vscroll]'
})
export class VscrollDirective {
	scroll = new EventEmitter();
	reset = new EventEmitter<{ handled: boolean, source: string }>();

	constructor(private elementRef: ElementRef, zone: NgZone, renderer: Renderer2) {
		zone.runOutsideAngular(() => {
			elementRef
				.nativeElement
				.addEventListener(
					'scroll',
					() => this.scroll.emit(),
					{ passive: true }
				);

			renderer.listen(
				window,
				'resize',
				() => {
					const e = { handled: false, source: 'resize' };
					this.reset.emit(e);
				}
			);
		});
	}

	get element() {
		return this.elementRef.nativeElement;
	}

	drawPlaceholder(width: number | boolean, height: number | boolean) {
		const box = this.elementRef.nativeElement;
		const style = box.style;
		const placeholder = placeholderBitmap(width || box.clientWidth, height || box.clientHeight);

		style.backgroundImage = 'url(' + placeholder + ')';
		style.backgroundRepeat = 'repeat';
	}

	resetX() {
		this.elementRef.nativeElement.scrollLeft = 0;
	}

	resetY() {
		this.elementRef.nativeElement.scrollTop = 0;
	}
}
