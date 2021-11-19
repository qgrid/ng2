import * as columnService from '../column/column.service';
import { Command } from '../command/command';
import { GridError } from '../infrastructure/error';
import * as sortService from '../sort/sort.service';

export class SortLet {
	constructor(plugin) {
		const { model } = plugin;
		this.plugin = plugin;

		this.hover = false;
		this.toggle = new Command({
			source: 'sort.view',
			canExecute: column => {
				const key = column.key;
				const map = columnService.mapColumns(model.columnList().line);
				return map.hasOwnProperty(key) && map[key].canSort !== false;
			},
			execute: column => {
				const key = column.key;
				const sort = model.sort;
				const sortState = sort();
				let by = Array.from(sortState.by);

				if (sortState.mode === 'mixed') {
					const { code, status } = model.keyboard();
					const isSingleMode = code !== 'shift' || status !== 'down';
					// if shift key is not pressed - reset sort for other columns and do sort like single mode
					if (isSingleMode) {
						const index = sortService.getIndex(by, key);
						by = index >= 0 ? by.filter((_, i) => i === index) : [];
					}
				}
				const index = sortService.getIndex(by, key);
				if (index >= 0) {
					const dir = sortService.getDirection(by[index]);
					switch (dir) {
						case 'desc': {
							by.splice(index, 1);
							this.hover = false;
							break;
						}
						case 'asc': {
							const entry = { [key]: 'desc' };
							by[index] = entry;
							this.hover = false;
							break;
						}
						default:
							throw GridError(
								'head.core',
								`Invalid sort direction ${dir}`);
					}
				}
				else {
					if (sortState.mode === 'single') {
						by.length = 0;
					}

					const entry = { [key]: 'asc' };
					by.push(entry);

					const order = sortService.orderFactory(model);
					order(by);
				}

				sort({ by }, { source: 'sort.view' });
			}
		});

		this.onInit();
	}

	onInit() {
		const { model, observeReply } = this.plugin;
		const { sort } = model;

		observeReply(model.columnListChanged)
			.subscribe(e => {
				if (e.hasChanges('index')) {
					const sortState = sort();
					const order = sortService.orderFactory(model);
					const sortBy = order(Array.from(sortState.by));
					if (!this.equals(sortBy, sortState.by)) {
						sort({ by: sortBy }, { source: 'sort.view' });
					}
				}
			});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('columns')) {
					const { by } = sort();
					const columnMap = columnService.mapColumns(e.state.columns);
					const newBy = by.filter(entry => columnMap.hasOwnProperty(sortService.getKey(entry)));
					if (!this.equals(newBy, by)) {
						sort({ by: newBy }, { source: 'sort.view' });
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
		return sortService.getMap(by)[key];
	}

	order(column) {
		const { key } = column;
		const { model } = this.plugin;
		const { by } = model.sort();
		return sortService.getIndex(by, key);
	}
}