import { Directive, ElementRef } from '@angular/core';
import { VscrollPort } from './vscroll.port';
import { VscrollContext } from './vscroll.context';
import { capitalize } from './vscroll.utility';
import { VscrollBox } from './vscroll.box';
import { VscrollLayout } from './vscroll.layout';
import { findPosition, recycleFactory, IVscrollPosition } from './vscroll.position';
import { isNumber } from 'ng2-qgrid/core/utility';


@Directive({
	selector: '[q-grid-vscroll-port-x]',
	providers: [VscrollLayout]
})
export class VscrollPortXDirective extends VscrollPort {
	constructor(context: VscrollContext, elementRef: ElementRef, layout: VscrollLayout) {
		super(context, elementRef.nativeElement, layout);
	}

	protected getPosition(offsets: Array<number>, box: VscrollBox, arm: number) : IVscrollPosition {
		const value = Math.max(0, box.scrollLeft - arm);
		const size = this.getItemSize();
		return findPosition(offsets, value, size);
	}

	protected move(left: number, right: number) {
		this.pad('left', left);
		this.pad('right', right);
	}

	protected getItemSize(): number {
		const columnWidth = this.context.settings.columnWidth as number;
		return isNumber(columnWidth) ? columnWidth : 0;
	}

	protected getScrollSize(box: VscrollBox) {
		return box.scrollWidth;
	}

	protected getPortSize(box: VscrollBox) {
		return box.portWidth;
	}

	protected recycleFactory(items: Array<any>) {
		const recycle = recycleFactory(items);
		return (index: number, count: number) => {
			const size = this.getItemSize();
			if (size) {
				return [];
			}

			return recycle(index, count);
		};
	}

	canApply(newBox: VscrollBox, oldBox: VscrollBox) {
		return !oldBox.portWidth || newBox.scrollWidth !== oldBox.scrollWidth;
	}

	private pad(pos: string, value: number) {
		const container = this.context.container;
		container.write(function () {
			if (this.layout.markup.hasOwnProperty(pos)) {
				const mark = this.layout.markup[pos];
				mark.style.width = value + 'px';
			} else {
				this.element.style['padding' + capitalize(pos)] = value + 'px';
			}
		});
	}
}
