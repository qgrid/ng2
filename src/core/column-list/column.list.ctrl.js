import { clone, isUndefined } from '../utility/kit';
import { getType } from '../services/convert';
import { compile } from '../services/path';
import * as columnService from '../column/column.service';
import { columnFactory } from '../column/column.factory';

export class ColumnListCtrl {
	constructor(model, canCopy, parseFactory) {
		this.model = model;
		this.canCopy = canCopy;
		this.parseFactory = parseFactory;
	}

	generateKey(source) {
		if (!isUndefined(source.editor)) {
			return `$default.${source.editor}`;
		} 
		
		if (!isUndefined(source.type)) {
			return `$default.${source.type}`;
		} 
		
		return '$default';
	}

	copy(target, source) {
		const canCopy = this.canCopy;
		const parseFactory = this.parseFactory;

		Object.keys(source)
			.filter(key => canCopy(key, source, target))
			.forEach(key => {
				const value = source[key];
				const accessor = compile(key);
				const targetValue = accessor(target);
				const type = getType(targetValue);
				const parse = parseFactory(type);
				const sourceValue = parse(value, targetValue);
				accessor(target, sourceValue);
			});
	}

	add(column) {
		const columnList = this.model.columnList;
		const columns = columnList().columns.concat([column]);
		columnList({ columns }, {
			source: 'column.list.ctrl',
			behavior: 'core'
		});
	}

	register(column) {
		const columnList = this.model.columnList;
		const reference = clone(columnList().reference);
		reference[column.type || '$default'] = column;
		columnList({ reference }, {
			source: 'column.list.ctrl',
			behavior: 'core'
		});
	}

	extract(key, type) {
		const model = this.model;
		const createColumn = columnFactory(model);
		let column = columnService.find(model.data().columns, key);
		if (column) {
			createColumn(type || 'text', column);
		} else {
			column = createColumn(type || 'text').model;
			column.key = key;
			column.source = 'template';
		}

		return column;
	}
}
