import { noop, isFunction } from '../utility/kit';
import { Composite } from '../infrastructure/composite';

export class StyleService {
	constructor(model) {
		this.style = model.style;
	}

	row() {
		const { rows, row } = this.style();
		const visitors = row === noop
			? rows
			: rows.concat([row]);

		return Composite.func(visitors);
	}

	cell() {
		const { cells, cell } = this.style();
		if (isFunction(cell)) {
			const visitors = cell === noop
				? cells
				: cells.concat([cell]);

			return Composite.func(visitors);
		}

		const keys = Object.keys(cell);
		if (keys.length) {
			const visitors = cells.concat(keys.map(key => {
				const visit = cell[key];
				return (row, column, context) => {
					if (column.key === key) {
						visit(row, column, context);
					}
				};
			}));

			return Composite.func(visitors);
		}

		return Composite.func(cells);
	}
}
