import { VscrollBox } from './vscroll.box';
import { VscrollDirective } from './vscroll.directive';
import { IVscrollPosition } from './vscroll.position';
import { VscrollLayout } from './vscroll.layout';
import { VscrollLink } from './vscroll.link';
import { VscrollContext } from './vscroll.context';

export function applyHTML(element: HTMLElement) {
	element.tabIndex = 0;
	element.style.outline = 'none';
	(element.style as any).overflowAnchor = 'none';
}

export interface VscrollPort {
	markup: { [key: string]: HTMLElement };
	layout: VscrollLayout;
	context: VscrollContext;

	reset();
	hasChanges(newBox: VscrollBox, oldBox: VscrollBox);
	emit(f: () => void);
	move(pad1: number, pad2: number);
	recycleFactory(items: Array<(() => number)>): (index: number, count: number) => Array<number>;
	getPositionUsingOffsets(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition;
	getPositionUsingItemSize(itemsSize: number, box: VscrollBox, arm: number): IVscrollPosition;
	getItemSize();
	getScrollSize(box: VscrollBox);
	getSize(box: VscrollBox);
}
