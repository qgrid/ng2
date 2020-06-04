
import * as columnService from '../column/column.service';
import * as sortService from '../sort/sort.service';
import { SortToggleCommand } from '../command-bag/sort.toggle.command';

export class SortLet {
	constructor(plugin) {
		const { model, observeReply, commandPalette } = plugin;
		this.plugin = plugin;

		this.toggle = new SortToggleCommand(plugin)
		commandPalette.register(this.toggle);

		observeReply(model.columnListChanged)
			.subscribe(e => {
				if (e.hasChanges('index')) {
					const { by } = model.sort();
					const order = sortService.orderFactory(model);
					const sortBy = order(Array.from(by));
					if (!this.equals(sortBy, by)) {
						sort({
							by: sortBy
						}, {
							source: 'sort.let'
						});
					}
				}
			});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					const { by } = sort();
					const columnMap = columnService.map(e.state.columns);
					const sortBy = by.filter(entry => columnMap.hasOwnProperty(sortService.key(entry)));
					if (!this.equals(sortBy, by)) {
						model.sort({
							by: sortBy
						}, {
							source: 'sort.let'
						});
					}
				}
			});
	}

	equals(x, y) {
		return JSON.stringify(x) === JSON.stringify(y);
	}

	direction(column) {
		const { key } = column;
		const { by } = this.plugin.model.sort();
		return sortService.map(by)[key];
	}

	order(column) {
		const { key } = column;
		const { model } = this.plugin;
		const { by } = model.sort();
		return sortService.index(by, key);
	}
}