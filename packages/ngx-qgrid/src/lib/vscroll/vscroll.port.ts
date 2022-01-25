import { VscrollBox } from './vscroll.box';
import { IVscrollPosition } from './vscroll.position';
import { VscrollLayout } from './vscroll.layout';
import { VscrollContext } from './vscroll.context';

export interface VscrollPort {
	markup: { [key: string]: HTMLElement };
	layout: VscrollLayout;
	context: VscrollContext;

	reset(): void;
	hasChanges(newBox: VscrollBox, oldBox: VscrollBox): boolean;
	emit(f: () => void): void;
	move(pad1: number, pad2: number): any;
	recycleFactory(items: Array<(() => number)>): (index: number, count: number) => Array<number>;
	getPositionUsingOffsets(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition;
	getPositionUsingItemSize(itemsSize: number, box: VscrollBox, arm: number): IVscrollPosition;
	getItemSize(): any;
	getScrollSize(box: VscrollBox): any;
	getSize(box: VscrollBox): any;
}
