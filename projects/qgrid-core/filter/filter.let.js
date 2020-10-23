import { FILTER_ROW_COMMIT_COMMAND_KEY } from '../command-bag/command.bag';

export class FilterLet {
	constructor(plugin) {
		const { commandPalette } = plugin;

		this.plugin = plugin;
		this.row = commandPalette.get(FILTER_ROW_COMMIT_COMMAND_KEY);
	}

	has(column) {
		const { model } = this.plugin;
		const { by } = model.filter();

		return by.hasOwnProperty(column.key);
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