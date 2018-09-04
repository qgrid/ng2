import { VscrollBox } from './vscroll.box';
import { VscrollDirective } from './vscroll.directive';
import { IVscrollPosition } from './vscroll.position';
import { VscrollLayout } from './vscroll.layout';
import { VscrollContext } from './vscroll.context';

export abstract class VscrollPort {
	markup = {};
	layout: VscrollLayout;
	context: VscrollContext;

	constructor(public view: VscrollDirective, element: HTMLElement) {
		element.tabIndex = 0;
		element.style.outline = 'none';
		(element.style as any).overflowAnchor = 'none';
	}

	abstract reset();
	abstract hasChanges(newBox: VscrollBox, oldBox: VscrollBox);
	abstract emit(f: () => void);
	abstract move(pad1: number, pad2: number);
	abstract recycleFactory(items: Array<(() => number)>): (index: number, count: number) => Array<number>;
	abstract getPositionUsingOffsets(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition;
	abstract getPositionUsingItemSize(itemsSize: number, box: VscrollBox, arm: number): IVscrollPosition;
	abstract getItemSize();
	abstract getScrollSize(box: VscrollBox);
	abstract getSize(box: VscrollBox);
}
