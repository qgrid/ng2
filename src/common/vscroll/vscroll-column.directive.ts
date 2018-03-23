import { Directive, Input, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
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
			const change = changes['index'];
			const layout = this.layout;
			const newIndex = change.currentValue;
			if (!change.firstChange) {
				const oldIndex = change.previousValue;
				layout.removeItem(oldIndex);
			}

			const size = sizeFactory(this.settings.columnWidth, this.container, this.column, newIndex);
			this.layout.setItem(newIndex, size);
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
