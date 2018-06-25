import { Directive, Input, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { sizeFactory } from './vscroll.container';
import { VscrollPortYDirective } from './vscroll-port-y.directive';

@Directive({
	selector: '[q-grid-vscroll-row]'
})
export class VscrollRowDirective implements OnDestroy, OnChanges {
	@Input('q-grid-vscroll-row') index: number;
	private row: HTMLElement;

	constructor(elementRef: ElementRef, private port: VscrollPortYDirective) {
		this.row = elementRef.nativeElement;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['index']) {
			if (this.port.getItemSize()) {
				this.ngOnChanges = null;
				return;
			}

			const { layout, settings, container, row } = this;
			const { rowHeight } = settings;
			this.ngOnChanges = (changes: SimpleChanges) => {
				if (changes['index']) {
					const change = changes['index'];
					const newIndex = change.currentValue;
					const oldIndex = change.previousValue;
					layout.removeItem(oldIndex);

					const size = sizeFactory(rowHeight, container, row, newIndex);
					layout.setItem(newIndex, size);
				}
			};

			const change = changes['index'];
			const newIndex = change.currentValue;
			const size = sizeFactory(rowHeight, container, row, newIndex);
			layout.setItem(newIndex, size);
		}
	}

	ngOnDestroy() {
		this.port.layout.removeItem(this.index);
	}

	private get layout() {
		return this.port.layout;
	}

	private get settings() {
		return this.port.context.settings;
	}

	private get container() {
		return this.port.context.container;
	}
}
