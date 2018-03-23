import { Directive, ElementRef } from '@angular/core';
import { VscrollPort } from './vscroll.port';
import { VscrollContext } from './vscroll.context';
import { capitalize } from './vscroll.utility';
import { VscrollBox } from './vscroll.box';
import { VscrollLayout } from './vscroll.layout';
import { findPosition, recycleFactory, IVscrollPosition } from './vscroll.position';
import { VscrollDirective } from './vscroll.directive';
import { VscrollLink } from './vscroll.link';
import { isNumber } from 'ng2-qgrid/core/utility';

@Directive({
	selector: '[q-grid-vscroll-port-y]',
	providers: [VscrollLayout]
})
export class VscrollPortYDirective extends VscrollPort {
	private link: VscrollLink;

	constructor(
		context: VscrollContext,
		elementRef: ElementRef,
		layout: VscrollLayout,
		view: VscrollDirective) {
		super(context, elementRef.nativeElement, layout);

		this.link = new VscrollLink(this, view);
	}

	public reset(view: VscrollDirective) {
		view.resetY();
	}

	protected getPosition(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition {
		const value = Math.max(0, box.scrollTop - arm);
		const size = this.getItemSize();
		return findPosition(offsets, value, size);
	}

	protected move(top: number, bottom: number) {
		this.pad('top', top);
		this.pad('bottom', bottom);
	}

	protected getItemSize(): number {
		const rowHeight = this.context.settings.rowHeight as number;
		return isNumber(rowHeight) ? rowHeight : 0;
	}

	protected getScrollSize(box: VscrollBox) {
		return box.scrollHeight;
	}

	protected getPortSize(box: VscrollBox) {
		return box.portHeight;
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

	hasChanges(newBox: VscrollBox, oldBox: VscrollBox) {
		return !oldBox.portHeight || newBox.scrollTop !== oldBox.scrollTop;
	}

	private pad(pos: string, value: number) {
		const container = this.context.container;
		container.write(function () {
			if (this.layout.markup.hasOwnProperty(pos)) {
				const mark = this.layout.markup[pos];
				mark.style.height = value + 'px';
			} else {
				this.element.style['padding' + capitalize(pos)] = value + 'px';
			}
		});
	}
}
