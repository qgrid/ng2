function replacer(key, value) {
	if (value instanceof Map) {
		return {
			type: 'map',
			value: Array.from(value.entries()),
		};
	}

	if (value instanceof Set) {
		return {
			type: 'set',
			value: Array.from(value.values()),
		};
	}

	return value;
}

function reviver(key, value) {
	if (typeof value === 'object' && value !== null) {
		if (value.type === 'map') {
			return new Map(value.value);
		}

		if (value.type === 'set') {
			return new Set(value.value);
		}
	}

	return value;
}

export class PersistenceStorage {
	constructor(storage) {
		this.storage = storage;
	}

	getItem(key) {
		return new Promise(resolve => {
			const item = JSON.parse(this.storage.getItem(key), reviver);
			resolve(item);
		});
	}

	setItem(key, value) {
		return new Promise(resolve => {
			const item = this.storage.setItem(key, JSON.stringify(value, replacer));
			resolve(item);
		});
	}
}