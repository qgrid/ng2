import { Injectable, EventEmitter } from '@angular/core';
import { findPosition, IVscrollPosition, recycleFactory } from './vscroll.position';
import { VscrollBox } from './vscroll.box';
import { VscrollPort } from './vscroll.port';
import { IVscrollSettings } from './vscroll.settings';

const UNSET_ARM = Number.MAX_SAFE_INTEGER;

function empty() {
	return 0;
}

export class VscrollLayout {
	private items = [];
	private minArm = UNSET_ARM;
	private position = findPosition([], 0, 0);
	private getOffsets = recycleFactory(this.items);

	constructor(private port: VscrollPort) {
	}

	recycle(count: number, box: VscrollBox, force: boolean): IVscrollPosition | null {
		const position = this.position;
		const threshold = this.settings.threshold;
		const offsets = this.getOffsets(position.index, count);
		const arm = this.getArm(offsets, box, position.index);
		const port = this.port;

		this.minArm = Math.min(this.minArm, arm);

		const newPosition = port.getPosition(offsets, box, this.minArm);
		if (force || position.index !== newPosition.index) {
			const itemSize = port.getItemSize();
			if (itemSize) {
				newPosition.pad = Math.max(0, itemSize * (count - threshold));
			} else {
				const last = Math.min(offsets.length - 1, newPosition.index + threshold - 1);
				const first = newPosition.index - 1;
				const viewSize = (offsets[last] || 0) - (offsets[first] || 0);
				const scrollSize = offsets[offsets.length - 1] || 0;
				const padSize = scrollSize - viewSize;
				newPosition.pad = padSize;
			}

			return this.position = newPosition;
		}

		return null;
	}

	invalidate(position: IVscrollPosition): number {
		const offset = position.offset;
		const pad1 = Math.max(0, offset);
		const pad2 = Math.max(0, position.pad - pad1);

		this.port.move(pad1, pad2);
		return position.index;
	}

	reset() {
		this.minArm = UNSET_ARM;
		this.getOffsets = this.port.recycleFactory(this.items);
		this.position = findPosition([], 0, 0);
		return this.invalidate(this.position);
	}

	setItem(index: number, item: () => number) {
		this.items[index] = item;
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
