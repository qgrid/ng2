import { Command } from '../command/command';
import { clone, isUndefined } from '../utility/kit';

export class FilterView {
	constructor(model) {
		this.model = model;

		this.column = new Command({
			source: 'filter.view',
			execute: (column, search) => {
				const { key } = column;

				let { by, operatorFactory } = model.filter();
				by = clone(by);
				const filter = by[key] || (by[key] = {});
				if (!isUndefined(search) && search !== null && search !== '') {
					const opList = operatorFactory(column);
					const op = filter.expression ? filter.expression.op : opList[0];
					if (op === 'contains') {
						filter.items = [search];
					} else {
						filter.expression = {
							kind: 'condition',
							left: key,
							op,
							right: search
						};
					}
				}
				else {
					delete by[key];
				}

				model.filter({ by }, { source: 'filter.view' });
			}
		});
	}

	has(column) {
		const { by } = this.model.filter();
		return by.hasOwnProperty(column.key);
	}

	value(column) {
		const { key } = column;
		const { by } = this.model.filter();
		if (by[key]) {
			const { expression, items } = by[key];
			return expression
				? expression.right
				: items && items.length
					? items[0]
					: null;
		}

		return null;
	}
}