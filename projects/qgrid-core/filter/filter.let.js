import { FilterRowCommitCommand } from '../command-bag/filter.row.commit.command';

export class FilterLet {
	constructor(plugin) {
		const { commandPalette } = plugin;

		this.plugin = plugin;

		this.row = new FilterRowCommitCommand(plugin);
		commandPalette.register(this.row);
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
				? expression.right
				: items && items.length
					? items[0]
					: null;
		}

		return null;
	}
}