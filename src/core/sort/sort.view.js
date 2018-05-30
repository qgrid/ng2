import { AppError } from '../infrastructure/error';
import { Command } from '../command/command';
import * as columnService from '../column/column.service';
import * as sortService from '../sort/sort.service';

export class SortView {
	constructor(model) {
		this.model = model;

		this.hover = false;
		this.toggle = new Command({
			source: 'sort.view',
			canExecute: column => {
				const key = column.key;
				const map = columnService.map(model.data().columns);
				return map.hasOwnProperty(key) && map[key].canSort !== false;
			},
			execute: column => {
				const key = column.key;
				const sort = model.sort;
				const sortState = sort();
				const by = Array.from(sortState.by);
				const index = sortService.index(by, key);
				if (index >= 0) {
					const dir = sortService.direction(by[index]);
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
							throw AppError(
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
		const model = this.model;
		const sort = model.sort;

		model.columnListChanged.watch(e => {
			if (e.hasChanges('index')) {
				const sortState = sort();
				const order = sortService.orderFactory(model);
				const sortBy = order(Array.from(sortState.by));
				if (!this.equals(sortBy, sortState.by)) {
					sort({ by: sortBy }, { source: 'sort.view' });
				}
			}
		});

		model.dataChanged.watch(e => {
			if (e.hasChanges('columns')) {
				const sortState = sort();
				const columnMap = columnService.map(e.state.columns);
				const by = sortState.by.filter(entry => columnMap.hasOwnProperty(sortService.key(entry)));
				if (!this.equals(by, sortState.by)) {
					sort({ by }, { source: 'sort.view' });
				}
			}
		});
	}

	equals(x, y) {
		return JSON.stringify(x) === JSON.stringify(y);
	}

	direction(column) {
		const key = column.key;
		const state = this.model.sort();
		const by = state.by;
		return sortService.map(by)[key];
	}

	order(column) {
		const key = column.key;
		const state = this.model.sort();
		const by = state.by;
		return sortService.index(by, key);
	}
}