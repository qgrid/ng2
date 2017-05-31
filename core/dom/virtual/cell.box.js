export class CellBox {
	constructor(box) {
		this.box = box;
		this.entries = new Map();
	}

	addClass(cell, name) {
		const key = this.key(cell);
		const model = cell.model;
		if (model) {
			let entry = this.entries.get(key);
			if (!entry) {
				entry = {
					classList: new Set([name]),
					viewRowIndex: cell.rowIndex,
					viewColumnIndex: cell.columnIndex,
					dataRowIndex: model.rowIndex,
					dataColumnIndex: model.columnIndex
				};
				this.entries.set(key, entry);
			}

			entry.classList.add(name);
		}
	}

	removeClass(cell, name) {
		const key = this.key(cell);
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
		const getKey = this.key;
		const entries = new Map();
		for (let [key, entry] of this.entries) {
			const viewCell = box.cellCore(entry.viewRowIndex, entry.viewColumnIndex);
			const dataCell = box.cell(entry.dataRowIndex, entry.dataColumnIndex);
			const newKey = getKey(dataCell);
			if (key !== newKey) {
				for (let cls of entry.classList) {
					entry.viewRowIndex = dataCell.rowIndex;
					entry.viewColumnIndex = dataCell.columnIndex;
					viewCell.removeClassCore(cls);
					dataCell.addClassCore(cls);
				}

				entries.set(newKey, entry);
			}
			else {
				entries.set(key, entry);
			}
		}
		this.entries = entries;
	}

	key(model) {
		return `${model.rowIndex}x${model.columnIndex}`;
	}
}