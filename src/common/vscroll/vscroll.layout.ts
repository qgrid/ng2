import { Injectable, EventEmitter } from '@angular/core';
import { findPosition, IVscrollPosition, recycleFactory } from './vscroll.position';
import { VscrollBox } from './vscroll.box';
import { VscrollPort } from './vscroll.port';
import { IVscrollSettings } from './vscroll.settings';

const UNSET_ARM = Number.MAX_SAFE_INTEGER;
const UNSET_OFFSET = 0;

function empty() {
	return 0;
}

export class VscrollLayout {
	updateEvent = new EventEmitter<any>();

	private items = [];
	private maxOffset = UNSET_OFFSET;
	private minArm = UNSET_ARM;
	private position = findPosition([], 0, 0);
	private getOffsets = recycleFactory(this.items);

	constructor(private port: VscrollPort) {
	}

	recycle(count: number, box: VscrollBox, force: boolean): IVscrollPosition | null {
		const position = this.position;
		const offsets = this.getOffsets(position.index, count);
		const threshold = this.settings.threshold;

		const arm = this.getArm(offsets, box, position.index);
		this.minArm = Math.min(this.minArm, arm);

		const newPosition = this.port.getPosition(offsets, box, this.minArm);
		if (force || position.index !== newPosition.index) {
			this.position = newPosition;
			return newPosition;
		}

		return null;
	}

	invalidate(count: number, box: VscrollBox, position): number {
		const offset = position.offset;
		const threshold = this.settings.threshold;
		const scrollSize = this.port.getScrollSize(box);
		const itemSize = this.port.getItemSize();
		this.maxOffset = itemSize
			? Math.max(0, itemSize * (count - threshold))
			: scrollSize <= position.lastOffset ? Math.max(this.maxOffset, offset) : this.maxOffset;

		const pad1 = Math.max(0, offset);
		const pad2 = Math.max(0, this.maxOffset - pad1);

		this.port.move(pad1, pad2);
		return position.index;
	}

	refresh(count: number, box: VscrollBox) {
		this.maxOffset = UNSET_OFFSET;
		this.minArm = UNSET_ARM;
		return this.invalidate(count, box, this.position);
	}

	reset(count: number, box: VscrollBox) {
		this.maxOffset = UNSET_OFFSET;
		this.minArm = UNSET_ARM;
		this.getOffsets = this.port.recycleFactory(this.items);
		this.position = findPosition([], 0, 0);
		return this.invalidate(count, box, this.position);
	}

	setItem(index: number, item: () => number) {
		this.items[index] = item;
		this.updateEvent.emit({ action: 'set', index });
	}

	removeItem(index: number) {
		const items = this.items;
		let last = items.length - 1;
		if (index === 0) {
			items.shift();
		} else if (index === last) {
			items.pop();
			while (last-- && items[last] === empty) {
				items.pop();
			}
		} else {
			// TODO: think how to avoid this
			items[index] = empty;
		}

		this.updateEvent.emit({ action: 'remove', index });
	}

	private getArm(offsets: Array<number>, box: VscrollBox, index: number) {
		const itemSize = this.port.getItemSize();
		if (itemSize) {
			const threshold = this.settings.threshold;
			const portSize = this.port.getSize(box);
			const viewSize = threshold * itemSize;
			return Math.max(0, (viewSize - portSize) / 2);
		}

		if (offsets.length) {
			const threshold = this.settings.threshold;
			const portSize = this.port.getSize(box);
			const last = Math.min(offsets.length, index + threshold) - 1;
			const first = (last + 1) - threshold;
			const viewSize = offsets[last] - offsets[first];
			return Math.max(0, (viewSize - portSize) / 2);
		}

		return UNSET_ARM;
	}

	private get settings() {
		return this.port.context.settings;
	}
}
