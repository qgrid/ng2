export class StyleBox {
	constructor(context) {
		this.context = context;
		this.entries = new Map();
	}

	addClass(item, name) {
		const key = this.key(item);
		if (key !== null) {
			let entry = this.entries.get(key);
			if (!entry) {
				entry = new Set();
				this.entries.set(key, entry);
			}

			entry.add(name);
		}
	}

	removeClass(item, name) {
		const key = this.key(item);
		if (key !== null) {
			let entry = this.entries.get(key);
			if (entry) {
				entry.delete(name);
				if (!entry.size) {
					this.entries.delete(key);
				}

				return true;
			}
		}

		return false;
	}

	key(item) {
		return item;
	}
}