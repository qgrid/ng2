import { merge as mergeFactory } from '../services/merge';
import { compile } from '../services/path';
import { getType } from '../services/convert';
import { TextColumnModel } from '../column-type/text.column';
import { startCase, assignWith, noop, isUndefined } from '../utility/kit';
import { columnFactory } from '../column/column.factory';
import { AppError } from '../infrastructure/error';

function merge(left, right, force = false) {
	let canAssign;
	if (force) {
		canAssign = (source, target) => !isUndefined(target) && target !== null ? target : source;
	}
	else {
		canAssign = (source, target) => !isUndefined(target) && target !== null && source === null ? target : source;
	}

	const doMerge = mergeFactory({
		equals: (l, r) => l.key === r.key,
		update: (l, r) => assignWith(l, r, canAssign),
		insert: (r, left) => left.push(r),
		remove: noop
	});

	return doMerge(left, right);
}

function hasChanges(statistics) {
	return statistics.some(st => st.inserted || st.update);
}

export function generateFactory(model) {
	const data = model.data;
	const createColumn = columnFactory(model);
	return () => {
		const rows = data().rows;
		const templateColumns = model.columnList().columns;
		const generatedColumns = [];
		const generation = model.columnList().generation;
		if (generation) {
			switch (generation) {
				case 'deep': {
					generatedColumns.push(...generate({ rows, columnFactory: createColumn, deep: true }));
					break;
				}
				case
					'shallow': {
						generatedColumns.push(...generate({ rows, columnFactory: createColumn, deep: false }));
						break;
					}
				default:
					throw new AppError('column.list.generate', `Invalid generation mode "${generation}"`);
			}
		}

		const dataColumns = Array.from(data().columns);
		const statistics = [];

		if (generatedColumns.length) {
			statistics.push(merge(dataColumns, generatedColumns, false));
		}

		if (templateColumns.length) {
			statistics.push(merge(dataColumns, templateColumns, true));
		}

		return {
			columns: dataColumns,
			statistics: statistics,
			hasChanges: hasChanges(statistics)
		};
	};
}

export function generate(settings) {
	const context = assignWith({
		deep: true,
		rows: [],
		columnFactory: () => new TextColumnModel(),
		title: startCase
	}, settings);
	if (context.rows.length) {
		return build(context.rows[0], null, context.columnFactory, context.deep, context.title);
	}
	return [];
}

function build(graph, path, columnFactory, deep, title) {
	const props = Object.getOwnPropertyNames(graph);
	return props.reduce((columns, prop) => {
		const value = graph[prop];
		const propPath = path ? `${path}.${prop}` : prop;
		const type = getType(value);
		switch (type) {
			case 'array': {
				const column = columnFactory(type).model;
				column.key = propPath;
				column.title = title(propPath, graph, column.length);
				column.path = propPath;
				column.value = compile(propPath);
				column.source = 'generation';
				columns.push(column);
				break;
			}
			case 'collection': {
				break;
			}
			case 'object': {
				if (deep) {
					columns.push(...build(value, propPath, columnFactory, true, title));
				}
				break;
			}
			default: {
				const column = columnFactory(type).model;
				column.key = propPath;
				column.title = title(propPath, graph, column.length);
				column.path = propPath;
				column.value = compile(propPath);
				column.source = 'generation';
				columns.push(column);
				break;
			}
		}

		return columns;
	}, []);
}