import * as css from '../services/css';

class Entry {
	constructor(element, sheets, markDirty) {
		this.element = element;
		this.list = new Set();
		this.sheets = sheets;
		this.markDirty = markDirty;
	}

	class(key, style) {
		key = css.escape(key);
		this.list.add(key);
		this.markDirty(this);
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
		this.entries = new Set();
		this.newSheets = new Map();
		this.oldSheets = new Map();
	}

	enter() {
		const newSheets = this.newSheets;
		let entries = this.entries;
		for (let entry of entries) {
			for (let cls of entry.list) {
				entry.element.removeClass(cls, true);
			}
		}

		entries = this.entries = new Set();
		const markDirty = entry => entries.add(entry);

		return element => {
			const entry = new Entry(element, newSheets, markDirty);
			return entry.class.bind(entry);
		};
	}

	exit() {
		const entries = this.entries;
		for (let entry of entries) {
			for (let cls of entry.list) {
				entry.element.addClass(cls, true);
			}
		}

		const newSheets = this.newSheets;
		const oldSheets = this.oldSheets;
		const id = this.model.grid().id;
		for (let cls of oldSheets.keys()) {
			if (!newSheets.has(cls)) {
				const sheet = css.sheet(id, cls);
				sheet.remove();
			}
		}

		for (let [cls, style] of newSheets.entries()) {
			if (!oldSheets.has(cls)) {
				const sheet = css.sheet(id, cls);
				sheet.set({[`.${cls}`]: style});
			}
		}

		this.oldSheets = newSheets;
		this.newSheets = new Map();
	}
}