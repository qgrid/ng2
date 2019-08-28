import { Command } from '../command/command';
import { clone, isUndefined } from '../utility/kit';

export class FilterView {
	constructor(model) {
		this.model = model;

		this.column = new Command({
			source: 'filter.view',
			execute: (column, search) => {
				const { key } = column;
				const { filter } = model;

				const by = clone(filter().by);
				if (!isUndefined(search) && search !== '') {
					const filter = by[key] || (by[key] = {});
					filter.expression = {
						kind: 'condition',
						left: key,
						op: filter.expression ? filter.expression.op : 'like',
						right: search
					};
				}
				else {
					delete by[key].expression;
					if (!(filter.items && filter.items.length) || filter.blanks) {
						delete by[key];
					}
				}

				filter({ by });
			}
		});
	}

	has(column) {
		const { by } = this.model.filter();
		return by.hasOwnProperty(column.key);
	}
}