export class PersistenceStorage {
	constructor(storage) {
		this.storage = storage;
	}

	getItem(key) {
		return new Promise(resolve => {
			const item = JSON.parse(this.storage.getItem(key));
			resolve(item);
		});
	}

	setItem(key, value) {
		return new Promise(resolve => {
			const item = this.storage.setItem(key, JSON.stringify(value));
			resolve(item);
		});
	}
}