import { VscrollBox } from './vscroll.box';
import { IVscrollPosition } from './vscroll.position';
import { VscrollLayout } from './vscroll.layout';
import { VscrollContext } from './vscroll.context';
import { Nullable } from '@qgrid/core';

export function applyHTML(element: HTMLElement) {
  element.tabIndex = 0;
  element.style.outline = 'none';
  element.style.overflowAnchor = 'none';
}

export interface VscrollPort {
	markup: { [key: string]: HTMLElement };
	layout: Nullable<VscrollLayout>;
	context: VscrollContext;

	reset(): void;
	hasChanges(newBox: VscrollBox, oldBox: VscrollBox): boolean;
	emit(f: () => void): void;
	move(pad1: number, pad2: number): void;
	recycleFactory(items: Array<(() => number)>): (index: number, count: number) => Array<number>;
	getPositionUsingOffsets(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition;
	getPositionUsingItemSize(itemsSize: number, box: VscrollBox, arm: number): IVscrollPosition;
	getItemSize(): number;
	getScrollSize(box: VscrollBox): number;
	getSize(box: VscrollBox): number;
}
