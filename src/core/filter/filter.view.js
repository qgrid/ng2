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
					by[key] = {
						expression: {
							kind: 'group',
							op: 'and',
							left: {
								kind: 'condition',
								left: key,
								op: 'like',
								right: search
							},
							right: null
						}
					};
				}
				else {
					delete by[key];
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