import { Directive, ElementRef, NgZone, Input, OnInit } from '@angular/core';
import { VscrollPort } from './vscroll.port';
import { VscrollContext } from './vscroll.context';
import { capitalize } from './vscroll.utility';
import { VscrollBox } from './vscroll.box';
import { VscrollLayout } from './vscroll.layout';
import { findPosition, recycleFactory, IVscrollPosition } from './vscroll.position';
import { VscrollDirective } from './vscroll.directive';
import { VscrollLink } from './vscroll.link';
import { isNumber } from 'ng2-qgrid/core/utility/kit';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';

@Directive({
	selector: '[q-grid-vscroll-port-y]'
})
export class VscrollPortYDirective extends VscrollPort implements OnInit {
	@Input('q-grid-vscroll-port-y') context: VscrollContext;
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

	public reset() {
		this.view.resetY();
	}

	emit(f: () => void) {
		this.zone.run(f);
	}

	getPosition(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition {
		const value = Math.max(0, box.scrollTop - arm);
		const size = this.getItemSize();
		return findPosition(offsets, value, size);
	}

	move(top: number, bottom: number) {
		this.pad('top', top);
		this.pad('bottom', bottom);
	}

	getItemSize(): number {
		const rowHeight = this.context.settings.rowHeight as number;
		return isNumber(rowHeight) ? rowHeight : 0;
	}

	getScrollSize(box: VscrollBox) {
		return box.scrollHeight;
	}

	getSize(box: VscrollBox) {
		return box.portHeight;
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
		return !oldBox.portHeight || newBox.scrollTop !== oldBox.scrollTop;
	}

	private pad(pos: string, value: number) {
		const container = this.context.container;
		container.write(() => {
			if (this.markup.hasOwnProperty(pos)) {
				const mark = this.markup[pos];
				mark.style.height = value + 'px';
			} else {
				this.elementRef.nativeElement.style['padding' + capitalize(pos)] = value + 'px';
			}
		});
	}
}
