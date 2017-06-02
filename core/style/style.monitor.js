import * as css from '../services/css';

class Entry {
	constructor(element, sheets) {
		this.element = element;
		this.oldList = {};
		this.newList = {};
		this.sheets = sheets;
	}

	class(key, style) {
		key = css.escape(key);
		this.newList[key] = true;
		if (style) {
			const sheets = this.sheets;
			if (!sheets.has(key)) {
				sheets.set(key, style);
			}
		}
	}
}

export class Monitor {
	constructor(model) {
		this.model = model;
		this.map = new Map();
		this.entries = [];
		this.newSheets = new Map();
		this.oldSheets = new Map();
	}

	add(element) {
		this.map.set(element, null);
	}

	remove(element) {
		this.map.delete(element);
	}

	enter() {
		const newSheets = this.newSheets;
		return element => {
			let entry = this.map.get(element);
			if (entry) {
				entry.oldList = entry.newList;
				entry.newList = {};
			}
			else {
				entry = new Entry(element);
				this.map.set(element, entry);
			}

			entry.sheets = newSheets;
			this.entries.push(entry);
			return entry.class.bind(entry);
		};
	}

	exit() {
		const entries = this.entries;
		let length = entries.length;
		while (length-- > 0) {
			const entry = entries[length];
			const element = entry.element;
			const newList = entry.newList;
			const oldList = entry.oldList;
			for (let cls of Object.keys(oldList)) {
				if (!newList.hasOwnProperty(cls)) {
					element.removeClass(cls);
				}
			}

			for (let cls of Object.keys(newList)) {
				if (!oldList.hasOwnProperty(cls)) {
					element.addClass(cls);
				}
			}
		}

		const newSheets = this.newSheets;
		const oldSheets = this.oldSheets;
		const id = this.model.grid().id;
		for (let cls of oldSheets.keys()) {
			if (!newSheets.has(cls)) {
				const sheet = css.sheet(`${id}-${cls}`);
				sheet.remove();
			}
		}

		for (let [cls, style] of newSheets.entries()) {
			if (!oldSheets.has(cls)) {
				const sheet = css.sheet(`${id}-${cls}`);
				sheet.set({[`.${cls}`]: style});
			}
		}

		this.entries = [];
		this.oldSheets = newSheets;
		this.newSheets = new Map();
	}
}