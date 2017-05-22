import {AppError} from './error';

const EMPTY = {tag: 'empty'};
export class Bucket {
	constructor() {
		this.items = [];
	}

	add(item, row) {
		if (!this.isEmpty(row)) {
			throw new AppError('bucket', `Can't add item, index ${row} is busy already`);
		}

		this.items[row] = item;
	}

	remove(item, row) {
		if (this.isEmpty(row) || item !== this.items[row]) {
			throw new AppError('bucket', `Can't find entry at index ${row}`);
		}

		const items = this.items;
		items[row] = EMPTY;

		let length = items.length;
		if (row === length) {
			items.pop();
			const isEmpty = this.isEmpty;
			while (length-- && isEmpty(length)) {
				items.pop();
			}
		}
	}

	find(row) {
		if (!this.isEmpty(row)) {
			return this.items[row];
		}

		return null;
	}

	count() {
		const isEmpty = this.isEmpty;
		return this.items
			.filter((_, i) => isEmpty(i))
			.length;
	}

	map(f) {
		const isEmpty = this.isEmpty;
		return this.items
			.map((item, i) => {
				if (!isEmpty(i)) {
					f(item, i);
				}
			});
	}

	isEmpty(row) {
		if (row < 0 || row >= this.items.length) {
			return true;
		}

		return this.items[row] === EMPTY;
	}
}