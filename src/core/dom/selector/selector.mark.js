import { Range } from '../../infrastructure/range';

export class SelectorMark {
	constructor(model, markup, name) {
		this.model = model;
		this.name = name;
		this.markup = markup;
	}

	select() {
		const result = [];
		const addNext = this.addFactory(result);

		addNext('left');
		addNext(null);
		addNext('right');

		return result;
	}

	addFactory(result) {
		const model = this.model;
		const rows = model.view().rows;
		const columns = model.scene().column.area;

		return pin => {
			const name = pin ? `${this.name}-${pin}` : this.name;
			const element = this.markup[name];
			if (element) {
				const prev = result[result.length - 1];
				const columnStart = prev ? prev.columnRange.end : 0;
				const columnCount = columns[pin].length;
				const rowStart = 0;
				const rowCount = rows.length;

				result.push({
					element: element,
					columnRange: new Range(columnStart, columnStart + columnCount),
					rowRange: new Range(rowStart, rowStart + rowCount)
				});
			}

			return result;
		};
	}
}