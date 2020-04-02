import {AppError} from './error';

export class Cache {
	constructor() {
		this.items = {};
	}

	set(key, value) {
		this.items[key] = value;
	}

	get(key) {
		const entry = this.find(key);
		if (!entry) {
			throw new AppError(
				'cache.get',
				`Entry with key was not found "${key}"`);
		}

		return entry;
	}

	has(key) {
		const items = this.items;
		return items.hasOwnProperty(key);
	}

	find(key) {
		const items = this.items;
		if (items.hasOwnProperty(key)) {
			return items[key];
		}

		return null;
	}

	remove(key) {
		if (!this.items.hasOwnProperty(key)) {
			throw new AppError(
				'cache.remove',
				`Entry with key was not found "${key}"`);
		}

		delete this.items[key];
	}

	clear() {
		this.items = {};
	}
}