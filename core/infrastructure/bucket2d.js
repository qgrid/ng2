import {AppError} from './error';
import {identity} from '../utility';

const identityIndexMapper = {
	row: identity,
	column: identity
};


class BucketEntryCore {
	constructor() {
	}

	map() {
		return [];
	}

	find() {
		return null;
	}

	add() {
	}

	remove() {
	}

	count() {
		return 0;
	}
}

class BucketEntry {
	constructor(entry, mapper) {
		this.entry = entry;
		this.mapper = mapper;
	}

	map(f) {
		const entry = this.entry;
		const mapper = this.mapper;
		return new Array(this.count).map((_, i) => f(entry[mapper.column(i)]));
	}

	find(column) {
		const entry = this.entry;
		column = this.mapper.column(column);
		if (entry.hasOwnProperty(column)) {
			return entry[column];
		}

		return null;
	}

	add(item, column) {
		const entry = this.entry;
		column = this.mapper.column(column, item);
		if (entry.hasOwnProperty(column)) {
			throw new AppError('bucket2d', `Item already exists at index ${column}`);
		}

		entry[column] = item;
	}

	remove(item, column) {
		const entry = this.entry;
		column = this.mapper.column(column, item);
		if (!entry.hasOwnProperty(column) || entry[column] !== item) {
			throw  new AppError('bucket2d', `Can't find item ${item}`);
		}

		delete entry[column];
		return Object.keys(entry).length === 0;
	}

	count() {
		return Object.keys(this.entry).length;
	}
}

const EMPTY = new BucketEntryCore();
export class Bucket2d {
	constructor(indexMapper = identityIndexMapper) {
		this.items = [];
		this.indexMapper = indexMapper;
		this.empty = {};
	}

	add(item, row, column) {
		row = this.indexMapper.row(row, item);
		let entry = this.items[row];
		if (!entry) {
			entry = new BucketEntry({}, this.indexMapper);
			this.items[row] = entry;
		}

		entry.add(item, column);
		delete this.empty[row];
	}

	remove(item, row, column) {
		row = this.indexMapper.row(row, item);
		const entry = this.items[row];
		if (!entry) {
			throw  new AppError('bucket2d', `Can't find entry at index ${row}`);
		}

		const isEmpty = entry.remove(item, column);
		if (isEmpty) {
			this.empty[row] = true;

			const items = this.items;
			let length = items.length;
			if (row === length) {
				items.pop();
				const isEmpty = this.isEmpty;
				while (length-- && isEmpty(length)) {
					items.pop();
				}
			}
		}
	}

	find(row, column) {
		if (this.isEmpty(row)) {
			return arguments.length > 1 ? EMPTY.find() : EMPTY;
		}

		row = this.indexMapper.row(row);
		const entry = this.items[row];
		if (arguments.length > 1) {
			return entry.find(column);
		}

		return entry;
	}

	count() {
		const isEmpty = this.isEmpty;
		return this.items
			.filter((_, i) => !isEmpty(i))
			.length;
	}

	map(f) {
		const isEmpty = this.isEmpty;
		return this.items
			.map((entry, i) => {
				if (!isEmpty(i)) {
					f(entry, i);
				}
			});
	}

	isEmpty(row) {
		row = this.indexMapper.row(row);
		return this.empty.hasOwnProperty(row) || !this.items[row];
	}
}