import * as css from '../services/css';
import {GRID_PREFIX} from '../definition';

class Entry {
	constructor(element, sheets) {
		this.element = element;
		this.list = new Set();
		this.sheets = sheets;
	}

	class(key, style) {
		key = `${GRID_PREFIX}-style-monitor-${css.escape(key)}`;
		this.list.add(key);
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
		this.entries = [];
		this.newSheets = new Map();
		this.oldSheets = new Map();
	}

	enter() {
		const newSheets = this.newSheets;
		let entries = this.entries;
		let length = entries.length;
		while (length-- > 0) {
			const entry = entries[length];
			for (let cls of entry.list) {
				entry.element.removeClass(cls);
			}
		}

		entries = this.entries = [];
		return element => {
			const entry = new Entry(element, newSheets);
			entries.push(entry);
			return entry.class.bind(entry);
		};
	}

	exit() {
		const entries = this.entries;
		let length = entries.length;
		while (length-- > 0) {
			const entry = entries[length];
			for (let cls of entry.list) {
				entry.element.addClass(cls);
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

		this.oldSheets = newSheets;
		this.newSheets = new Map();
	}
}