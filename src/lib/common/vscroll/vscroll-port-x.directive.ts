import { Directive, ElementRef, NgZone, Input, OnInit } from '@angular/core';
import { VscrollPort } from './vscroll.port';
import { VscrollContext } from './vscroll.context';
import { capitalize } from './vscroll.utility';
import { VscrollBox } from './vscroll.box';
import { VscrollLayout } from './vscroll.layout';
import { findPosition, recycleFactory, IVscrollPosition } from './vscroll.position';
import { VscrollDirective } from './vscroll.directive';
import { isNumber } from 'ng2-qgrid/core/utility/kit';
import { VscrollLink } from './vscroll.link';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';

@Directive({
	selector: '[q-grid-vscroll-port-x]'
})
export class VscrollPortXDirective extends VscrollPort implements OnInit {
	@Input('q-grid-vscroll-port-x') context: VscrollContext;
	markup = {};
	layout: VscrollLayout;

	constructor(
		private zone: NgZone,
		private elementRef: ElementRef,
		view: VscrollDirective) {
		super(view, elementRef.nativeElement);
	}

	ngOnInit() {
		Guard.notNull(this.context, 'context');

		this.layout = new VscrollLayout(this);
		return new VscrollLink(this);
	}

	reset() {
		this.view.resetX();
	}

	emit(f: () => void) {
		this.zone.run(f);
	}

	getPosition(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition {
		const value = Math.max(0, box.scrollLeft - arm);
		const size = this.getItemSize();
		return findPosition(offsets, value, size);
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
		const container = this.context.container;
		container.write(() => {
			if (this.markup.hasOwnProperty(pos)) {
				const mark = this.markup[pos];
				mark.style.width = value + 'px';
			} else {
				this.elementRef.nativeElement.style['padding' + capitalize(pos)] = value + 'px';
			}
		});
	}
}
