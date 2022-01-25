import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isNumber } from '@qgrid/core';
import { VscrollBox } from './vscroll.box';
import { VscrollContext } from './vscroll.context';
import { VscrollDirective } from './vscroll.directive';
import { VscrollLayout } from './vscroll.layout';
import { VscrollLink } from './vscroll.link';
import { VscrollPort } from './vscroll.port';
import { findPositionUsingItemSize, findPositionUsingOffsets, IVscrollPosition, recycleFactory } from './vscroll.position';
import { capitalize } from './vscroll.utility';

@Directive({
	selector: '[q-grid-vscroll-port-x]'
})
export class VscrollPortXDirective implements VscrollPort, OnChanges {
	private link!: VscrollLink;

	markup: { [key: string]: HTMLElement } = {};
	layout!: VscrollLayout;
	@Input('q-grid-vscroll-port-x') context!: VscrollContext;

	constructor(
		private elementRef: ElementRef,
		private view: VscrollDirective
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		const contextChange = changes['context'];
		if (contextChange && this.context) {
			this.layout = new VscrollLayout(this);
			this.link = new VscrollLink(this, this.view);
			this.context.container.reset();
		}
	}

	reset() {
		this.view.resetX();
	}

	emit(f: () => void) {
		const { settings } = this.context;

		if (settings.emit) {
			settings.emit(f);
		} else {
			f();
		}
	}

	getPositionUsingItemSize(itemSize: number, box: VscrollBox, arm: number): IVscrollPosition {
		const limitTop = box.scrollLeft - arm;
		const limitBottom = box.scrollWidth - (box.portWidth + arm);
		const value = Math.min(limitBottom, Math.max(0, limitTop));

		return findPositionUsingItemSize(value, itemSize);
	}

	getPositionUsingOffsets(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition {
		const limitTop = box.scrollLeft - arm;
		const limitBottom = box.scrollHeight - (box.portWidth + arm);
		const value = Math.min(limitBottom, Math.max(0, limitTop));

		return findPositionUsingOffsets(value, offsets);
	}

	move(left: number, right: number) {
		this.pad('left', left);
		this.pad('right', right);
	}

	getItemSize(): number {
		const columnWidth = this.context.settings.columnWidth as number;
		return isNumber(columnWidth) ? columnWidth : 0;
	}

	getScrollSize(box: VscrollBox) {
		return box.scrollWidth;
	}

	getSize(box: VscrollBox) {
		return box.portWidth;
	}

	recycleFactory(items: Array<any>) {
		const recycle = recycleFactory(items);
		return (index: number, count: number) => {
			const size = this.getItemSize();
			if (size) {
				return [];
			}

			return recycle(index, count);
		};
	}

	hasChanges(newBox: VscrollBox, oldBox: VscrollBox) {
		return !oldBox.portWidth || newBox.scrollWidth !== oldBox.scrollWidth;
	}

	private pad(pos: string, value: number) {
		if (this.markup.hasOwnProperty(pos)) {
			const mark = this.markup[pos];
			mark.style.width = value + 'px';
		} else {
			this.elementRef.nativeElement.style['padding' + capitalize(pos)] = value + 'px';
		}
	}
}
