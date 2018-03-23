import { EventEmitter } from '@angular/core';
import { findPosition, IVscrollPosition, recycleFactory } from './vscroll.position';
import { VscrollContext } from './vscroll.context';
import { VscrollBox } from './vscroll.box';
import { VscrollLayout } from './vscroll.layout';
import { VscrollDirective } from './vscroll.directive';

const UNSET_ARM = Number.MAX_SAFE_INTEGER;
const UNSET_OFFSET = 0;

export abstract class VscrollPort {
	private maxOffset = UNSET_OFFSET;
	private minArm = UNSET_ARM;
	private position = findPosition([], 0, 0);
	private getOffsets: (index: number, count: number) => Array<number>;

	constructor(
		public context: VscrollContext, 
		public element: HTMLElement, 
		public layout: VscrollLayout) {

		layout.context = context;
		this.getOffsets = recycleFactory(layout.items);
	}

	private getArm(offsets: Array<number>, box: VscrollBox, index: number) {
		const itemSize = this.getItemSize();
		if (itemSize) {
			const threshold = this.context.settings.threshold;
			const portSize = this.getPortSize(box);
			const viewSize = threshold * itemSize;
			return Math.max(0, (viewSize - portSize) / 2);
		}

		if (offsets.length) {
			const threshold = this.context.settings.threshold;
			const portSize = this.getPortSize(box);
			const last = Math.min(offsets.length, index + threshold) - 1;
			const first = (last + 1) - threshold;
			const viewSize = offsets[last] - offsets[first];
			return Math.max(0, (viewSize - portSize) / 2);
		}

		return UNSET_ARM;
	}

	recycle(count: number, box: VscrollBox, force: boolean): IVscrollPosition | null {
		const position = this.position;
		const offsets = this.getOffsets(position.index, count);
		const threshold = this.context.settings.threshold;

		const arm = this.getArm(offsets, box, position.index);
		this.minArm = Math.min(this.minArm, arm);

		const newPosition = this.getPosition(offsets, box, this.minArm);
		if (force || position.index !== newPosition.index) {
			this.position = newPosition;
			return newPosition;
		}

		return null;
	}

	invalidate(count: number, box: VscrollBox, position): number {
		const offset = position.offset;
		const threshold = this.context.settings.threshold;
		const scrollSize = this.getScrollSize(box);
		const itemSize = this.getItemSize();
		this.maxOffset = itemSize
			? Math.max(0, itemSize * (count - threshold))
			: scrollSize <= position.lastOffset ? Math.max(this.maxOffset, offset) : this.maxOffset;

		const pad1 = Math.max(0, offset);
		const pad2 = Math.max(0, this.maxOffset - pad1);

		this.move(pad1, pad2);
		return position.index;
	}

	refresh(count: number, box: VscrollBox) {
		this.maxOffset = UNSET_OFFSET;
		this.minArm = UNSET_ARM;
		return this.invalidate(count, box, this.position);
	}

	drop(count: number, box: VscrollBox) {
		this.maxOffset = UNSET_OFFSET;
		this.minArm = UNSET_ARM;
		this.getOffsets = this.recycleFactory(this.layout.items);
		this.position = findPosition([], 0, 0);
		return this.invalidate(count, box, this.position);
	}

	abstract reset(view: VscrollDirective);
	abstract hasChanges(newBox: VscrollBox, oldBox: VscrollBox);
	abstract emit(f: () => void);
	protected abstract move(pad1: number, pad2: number);
	protected abstract recycleFactory(items: Array<(() => number)>): (index: number, count: number) => Array<number>;
	protected abstract getPosition(offsets: Array<number>, box: VscrollBox, arm: number): IVscrollPosition;
	protected abstract getItemSize();
	protected abstract getScrollSize(box: VscrollBox);
	protected abstract getPortSize(box: VscrollBox);
}
