import { GridError } from './error';

const hasOwnProperty = Object.prototype.hasOwnProperty;

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
			throw new GridError(
				'cache.get',
				`Entry with key was not found "${key}"`);
		}

		return entry;
	}

	has(key) {
		const items = this.items;
		return hasOwnProperty.call(items, key);
	}

	find(key) {
		const items = this.items;
		if (hasOwnProperty.call(items, key)) {
			return items[key];
		}

		return null;
	}

	remove(key) {
		if (!hasOwnProperty.call(this.items, key)) {
			throw new GridError(
				'cache.remove',
				`Entry with key was not found "${key}"`);
		}

		delete this.items[key];
	}

	clear() {
		this.items = {};
	}
}
