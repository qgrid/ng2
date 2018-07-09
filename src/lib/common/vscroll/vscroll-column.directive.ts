import { Directive, Input, ElementRef, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { sizeFactory } from './vscroll.container';
import { VscrollPortYDirective } from './vscroll-port-y.directive';

@Directive({
	selector: '[q-grid-vscroll-column]'
})
export class VscrollColumnDirective implements OnDestroy, OnChanges {
	@Input('q-grid-vscroll-column') index: number;
	private column: HTMLElement;

	constructor(elementRef: ElementRef, private port: VscrollPortYDirective) {
		this.column = elementRef.nativeElement;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['index']) {
			if (this.port.getItemSize()) {
				this.ngOnChanges = null;
				return;
			}

			const { layout, settings, container, column } = this;
			const { rowHeight } = settings;
			this.ngOnChanges = (e: SimpleChanges) => {
				if (e['index']) {
					const change = e['index'];
					const newIndex = change.currentValue;
					const oldIndex = change.previousValue;
					layout.removeItem(oldIndex);

					const size = sizeFactory(rowHeight, container, column, newIndex);
					layout.setItem(newIndex, size);
				}
			};

			const firstChange = changes['index'];
			const firstIndex = firstChange.currentValue;
			const firstSize = sizeFactory(rowHeight, container, column, firstIndex);
			layout.setItem(firstIndex, firstSize);
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
