import { Command } from '../command/command';
import { clone, hasOwnProperty, isArray, isUndefined } from '../utility/kit';

export class FilterLet {
	constructor(plugin) {
		const { model } = plugin;

		this.plugin = plugin;

		this.column = new Command({
			source: 'filter.view',
			execute: (column, search) => {
				const { key } = column;

				let { by } = model.filter();
				const { operatorFactory } = model.filter();
				by = clone(by);

				const filter = by[key] || (by[key] = {});
				if (!isUndefined(search) && search !== null && search !== '') {
					const opList = operatorFactory(column);
					const op = filter.expression ? filter.expression.op : opList[0];
					switch (op) {
						case 'contains': {
							filter.items = [search];
							break;
						}
						case 'between': {
							filter.expression = {
								kind: 'condition',
								left: key,
								op,
								right: [null, search],
							};
							break;
						}
						default: {
							filter.expression = {
								kind: 'condition',
								left: key,
								op,
								right: search,
							};
							break;
						}
					}
				} else {
					delete by[key];
				}

				model.filter({ by }, { source: 'filter.view' });
			},
		});
	}

	has(column) {
		const { model } = this.plugin;
		const { by } = model.filter();
		return hasOwnProperty.call(by, column.key);
	}

	value(column) {
		const { model } = this.plugin;
		const { key } = column;
		const { by } = model.filter();
		if (by[key]) {
			const { expression, items } = by[key];
			return expression
				? isArray(expression.right)
					? expression.right[expression.right.length - 1]
					: expression.right
				: items && items.length
					? items[0]
					: null;
		}

		return null;
	}
}
