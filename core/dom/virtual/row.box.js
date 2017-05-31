export class RowBox {
	constructor(box) {
		this.box = box;
		this.entries = new Map();
	}

	addClass(row, name) {
		const key = row.index;
		const model = row.model;
		if (model) {
			let entry = this.entries.get(key);
			if (!entry) {
				entry = {
					classList: new Set([name]),
					viewIndex: row.index,
					dataIndex: model.rowIndex,
				};
				this.entries.set(key, entry);
			}

			entry.classList.add(name);
		}
	}

	removeClass(row, name) {
		const key = row.index;
		let entry = this.entries.get(key);
		if (entry) {
			entry.classList.delete(name);
			if (!entry.classList.size) {
				this.entries.delete(key);
			}
		}
	}

	invalidate() {
		const box = this.box;
		for (let entry of this.entries.values()) {
			const viewRow = box.rowCore(entry.viewIndex);
			const dataRow = box.row(entry.dataIndex);
			for (let cls of entry.classList) {
				viewRow.removeClassCore(cls);
				dataRow.addClassCore(cls);
				entry.viewIndex = dataRow.index;
			}
		}
	}
}