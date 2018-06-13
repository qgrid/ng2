import * as columnService from '../../core/column/column.service';
import { Command } from '../../core/command/command';
import { Aggregation } from '../../core/services/aggregation';
import { isFunction, noop } from '../../core/utility/kit';
import { Event } from '../../core/infrastructure/event';
import { isArray  } from '../../core/utility/kit';

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
			execute: (column, parent) => {
				const state = !this.state(column);
				
				this.toggleDeep(column, state);
				if (parent && parent.children) {
					parent.isVisible = parent.children.some(c => c.isVisible)
				}
			}
		});
		
		this.toggleAll = new Command({
			source: 'column.chooser',
			execute: () => {
				const state = !this.state(this.columns);
				
				this.toggleDeep(this.columns, state);
			}
		});
		
		this.defaults = new Command({
			source: 'column.chooser',
			execute: () => {
				const toggle = (columns) => {
					columns = isArray(columns) ? columns : [columns];
					
					for (let i = 0; i < columns.length; i++) {
						const column = columns[i];
						
						if (column.isDefault) {
							column.isVisible = column.isDefault === true;
							
							if (column.children.length) {
								toggle(column.children);
							}
						}
					}
				};
				
				toggle(this.columns);
			}
		});

		this.toggleAggregation = new Command({ source: 'column.chooser' });
		
		this.drop = new Command({
			source: 'column.chooser',
			canExecute: e => {
				const targetKey = e.dropData;
				const map = this.splitKey(targetKey);
				
				return map.hasOwnProperty(targetKey) && map[targetKey].canMove;
			},
			execute: e => {
				const sourceKey = e.dragData;
				const targetKey = e.dropData;
				const map = columnService.map(this.temp.columns);
				const hasChild = () => {
					return !map.hasOwnProperty(sourceKey);
				};
				
				if (sourceKey !== targetKey) {
					const indexColumn = () => {
						if (hasChild()) {
							return this.childTemp(sourceKey);
						} else {
							return this.temp;
						}
					};
					
					const { index, columns } = indexColumn();
					
					let oldIndex = index.indexOf(sourceKey);
					let newIndex = index.indexOf(targetKey);
					if (oldIndex >= 0 && newIndex >= 0) {
						index.splice(oldIndex, 1);
						index.splice(newIndex, 0, sourceKey);
						
						oldIndex = columns.findIndex(c => c.key === sourceKey);
						newIndex = columns.findIndex(c => c.key === targetKey);
						
						const column = columns[oldIndex];
						columns.splice(oldIndex, 1);
						columns.splice(newIndex, 0, column);
						
						if (hasChild()) {
							this.resetDeep(sourceKey, columns);
						}
						
						this.temp.columns = Array.from(this.temp.columns);
					}
				}
				
				return sourceKey;
			}
		});
		
		this.drag = new Command({
			source: 'column.chooser',
			canExecute: e => {
				const sourceKey = e.data;
				const map = this.splitKey(sourceKey);
				
				return map.hasOwnProperty(sourceKey) && map[sourceKey].canMove;
			}
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
						source: 'column.chooser.view'
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
		let state = true;
		
		function stateAll(columns) {
			columns = isArray(columns) ? columns : [columns];
			
			for (let i = 0; i < columns.length; i++) {
				const column = columns[i];
				
				if (column.isVisible !== true) {
					state = false;
					return;
				} else if (column.children.length) {
					stateAll(column.children);
				}
			}
		}
		
		stateAll(column);
		
		return state;
	}
	
	stateDefault() {
		return this.columns.every(c => (c.isDefault !== false && c.isVisible !== false) || (c.isDefault === false && c.isVisible === false));
	}
	
	isIndeterminate(columns) {
		let state = false;
		
		const isIndeterminate = (columns) => {
			columns = isArray(columns) ? columns : [columns];
			
			for (let i = 0; i < columns.length; i++) {
				const column = columns[i];
				
				if (column.isVisible) {
					state = true;
					return;
				} else if (column.children.length) {
					isIndeterminate(column.children);
				}
			}
		};
		
		isIndeterminate(columns);
		
		return !this.state(columns) && state;
	}

	originIndex() {
		return Array.from(this.model.columnList().index);
	}
	
	toggleDeep(columns, state) {
		const toggle = (columns) => {
			columns = isArray(columns) ? columns : [columns];
			
			for (let i = 0; i < columns.length; i++) {
				const column = columns[i];
				column.isVisible = state;
				
				if (column.children.length) {
					toggle(column.children);
				}
			}
		};
		
		toggle(columns);
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
				isDefault: c.isDefault,
				canMove: c.canMove,
				children: c.children
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
	
	childTemp(key) {
		const child = this.splitKey(key);
		const columns = Object.values(child);
		
		const index = [];
		for (let i = 0; i < columns.length; i++) {
			index.push(columns[i].key);
		}
		
		return {
			columns,
			index
		}
	}
	
	splitKey(key) {
		let map = columnService.map(this.temp.columns);
		
		if(map.hasOwnProperty(key)) {
			return map;
		}
		
		const nested = key.split('.');
		if (nested.length > 1) {
			let curr = 0;
			const max = nested.length;
			
			let str = '';
			while (curr < max - 1) {
				str = str + nested[curr];
				let column = map[str];
				map = columnService.map(column.children);
				str = str + '.';
				curr++;
			}
		}
		
		return map;
	}
	
	resetDeep(source, value) {
		const keys = source.split('.');
		let key = keys[0];
		
		const max = keys.length;
		let curr = 1;
		
		const reset = (columns) => {
			for (let i = 0; i < columns.length; i++) {
				let column = columns[i];
				
				if (column.key === key) {
					if (curr < max - 1) {
						key = key + '.' + keys[curr];
						curr++;
						reset(column.children)
					} else {
						column.children = value;
						return;
					}
				}
			}
		};
		
		reset(this.temp.columns);
	}
	
	transfer(column) {
		return {
			key: this.context.name,
			value: column.key
		};
	}
}
