function findIndexAt(items: Array<number>, value: number) {
	const length = items.length;
	let min = 0;
	let max = length - 1;
	while (min <= max) {
		const mid = (min + max) >> 1;
		const k = items[mid];
		if (k === value) {
			return mid;
		} else if (k < value) {
			min = mid + 1;
		} else {
			max = mid - 1;
		}
	}

	return min;
}

export interface IVscrollPosition {
	index: number;
	offset: number;
	lastOffset: number;
	value: number;
	pad: number;
}

export function findPositionUsingItemSize(value: number, itemSize: number) {
	const index = Math.max(0, Math.round(value / itemSize));
	return {
		index,
		offset: itemSize * index,
		lastOffset: 0,
		value,
		pad: 0
	};
}

export function findPositionUsingOffsets(value: number, offsets: Array<number>): IVscrollPosition {
	const index = findIndexAt(offsets, value);
	const { length } = offsets;
	if (index > 0) {
		return {
			index,
			offset: offsets[index - 1],
			lastOffset: offsets[length - 1],
			value,
			pad: 0
		};
	}

	return {
		index: 0,
		offset: 0,
		lastOffset: 0,
		value,
		pad: 0
	};
}

export function recycleFactory(items: Array<() => number>) {
	const offsets = new Array<number>();
	return (index: number, count: number) => {
		let cursor = offsets.length;
		const threshold = items.length;
		const diff = Math.min(count, threshold + index) - cursor;

		for (let i = threshold - diff; i < threshold; i++) {
			const getSize = items[i];
			const size = getSize();
			if (cursor === 0) {
				offsets[cursor] = size;
			} else {
				offsets[cursor] = offsets[cursor - 1] + size;
			}

			cursor++;
		}

		return offsets;
	};
}
