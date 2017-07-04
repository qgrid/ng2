import {startCase, assignWith} from '../utility';
import {compile, getType} from '../services';
import {TextColumnModel} from '../column-type';

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