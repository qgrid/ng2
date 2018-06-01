import * as columnService from '../../core/column/column.service';
import { Command } from '../../core/command/command';
import { Aggregation } from '../../core/services/aggregation';
import { isFunction, noop } from '../../core/utility/kit';
import { Event } from '../../core/infrastructure/event';

export class ColumnChooserView {
	constructor(model, context) {
		this.model = model;

		this.context = context;

		this.cancelEvent = new Event();
		this.submitEvent = new Event();

		this.temp = {
			index: [],
			columns: []
		};

		this.toggle = new Command({
			source: 'column.chooser',
			execute: column => {
				column.isVisible = !this.state(column);
			}
		});

		this.toggleAll = new Command({
			source: 'column.chooser',
			execute: () => {
				const state = !this.stateAll();
				for (let column of this.columns) {
					column.isVisible = state;
				}
			}
		});

		this.defaults = new Command({
			source: 'column.chooser',
			execute: () => {
				for (let column of this.columns) {
					column.isVisible = column.isDefault !== false;
				}
			}
		});

		this.toggleAggregation = new Command({ source: 'column.chooser' });


		let sourceKey = null;
		this.dropFactory = key => new Command({
			source: 'column.chooser',
			canExecute: e => {
				const map = columnService.map(this.temp.columns);
				const targetKey = e.target;
				return map.hasOwnProperty(targetKey) && map[targetKey].canMove;
			},
			execute: e => {
				const targetKey = e.target;
				const { rows } = model.scene().column;
				const { index } = this.temp;
				for (let columns of rows) {
					index.splice(sourceIndex, 1);
					index.splice(targetIndex, 0, sourceColumn.key);					
				}

				oldIndex = targetKey;
				return targetKey;
			}
		});

		this.dragOver = new Command({
			source: 'column.chooser',
			canExecute: e => {
				const map = columnService.map(this.temp.columns);
				return map.hasOwnProperty(key) && map[key].canMove;
			},
			execute: e => {
				const pathFinder = new PathService(table.context.bag.head);
				const newIndex = pathFinder.cell(e.path).columnIndex;

				const { rows } = model.scene().column;
				for (let columns of rows) {
					const index = Array.from(model.columnList().index);
					const sourceColumn = columns[oldIndex].model;
					const targetColumn = columns[newIndex].model;
					const sourceIndex = index.indexOf(sourceColumn.key);
					const targetIndex = index.indexOf(targetColumn.key);
					index.splice(sourceIndex, 1);
					index.splice(targetIndex, 0, sourceColumn.key);
					model.columnList({ index });
				}

				oldIndex = newIndex;
				return newIndex;
			}
		});

		this.drag = new Command({
			source: 'column.chooser',
			canExecute: e => {
				const map = columnService.map(this.temp.columns);
				const sourceKey = e.data;
				return map.hasOwnProperty(sourceKey) && map[sourceKey].canMove;
			},
			execute: e => sourceKey = e.data
		});


		this.submit = new Command({
			source: 'column.chooser',
			execute: () => {
				const model = this.model;
				const temp = this.temp;

				const columnMap = columnService.map(this.model.data().columns);
				temp.columns.forEach(column => {
					const originColumn = columnMap[column.key];
					if (originColumn) {
						originColumn.isVisible = column.isVisible;
						originColumn.aggregation = column.aggregation;
					}
				});

				model.columnList({
					index: Array.from(temp.index)
				}, {
						source: 'column.chooser'
				});

				this.submitEvent.emit();
			}
		});

		this.cancel = new Command({
			source: 'column.chooser',
			execute: () => {
				this.reset.execute();
				this.cancelEvent.emit();
			}
		});

		this.reset = new Command({
			source: 'column.chooser',
			execute: () => {
				this.temp.index = this.originIndex();
				this.temp.columns = this.originColumns(this.temp.index);
				this.temp.columnMap = columnService.map(this.temp.columns);
			}
		});

		this.aggregations = Object
			.getOwnPropertyNames(Aggregation)
			.filter(key => isFunction(Aggregation[key]));

		model.dataChanged.watch(e => {
			if (e.tag.source === 'column.chooser') {
				return;
			}

			if (e.hasChanges('columns')) {
				this.temp.columns = this.originColumns(this.temp.index);
			}
		});

		model.columnListChanged.watch(e => {
			if (e.tag.source === 'column.chooser') {
				return;
			}

			if (e.hasChanges('index')) {
				this.temp.index = this.originIndex();
				this.temp.columns = this.originColumns(this.temp.index);
			}
		});
	}

	get columns() {
		return this.temp.columns;
	}

	state(column) {
		return column.isVisible !== false;
	}

	stateAll() {
		return this.columns.every(this.state.bind(this));
	}

	stateDefault() {
		return this.columns.every(c => (c.isDefault !== false && c.isVisible !== false) || (c.isDefault === false && c.isVisible === false));
	}

	isIndeterminate() {
		return !this.stateAll() && this.columns.some(this.state.bind(this));
	}

	originIndex() {
		return Array.from(this.model.columnList().index);
	}

	originColumns(index) {
		const columns = this.model
			.data()
			.columns
			.filter(c => c.class === 'data')
			.map(c => ({
				key: c.key,
				title: c.title,
				isVisible: c.isVisible,
				aggregation: c.aggregation,
				isDefault: c.isDefault
			}));

		let i = 0;
		const indexMap = index
			.reduce((memo, key) => {
				memo[key] = i++;
				return memo;
			}, {});

		columns.sort((x, y) => indexMap[x.key] - indexMap[y.key]);
		return columns;
	}

	get canAggregate() {
		return this.columnChooserCanAggregate;
	}

	get resource() {
		return this.model.columnChooser().resource;
	}

	transfer(column) {
		return {
			key: this.context.name,
			value: column.key
		};
	}
}
