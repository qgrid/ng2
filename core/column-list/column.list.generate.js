import {startCase} from '../utility';
import {compile, getType} from '../services';

export function generate(rows, columnFactory, deep = true) {
	if (!rows || rows.length === 0) {
		return [];
	}

	return build(rows[0], null, columnFactory, deep);
}

function build(graph, path, columnFactory, deep) {
	const props = Object.getOwnPropertyNames(graph);
	return props.reduce((columns, prop) => {
		const value = graph[prop];
		const propPath = path ? `${path}.${prop}` : prop;
		const type = getType(value);
		switch (type) {
			case 'array': {
				const column = columnFactory(type).model;
				column.key = propPath;
				column.title = startCase(propPath);
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
					columns.push(...build(value, propPath, columnFactory, true));
				}
				break;
			}
			default: {
				const column = columnFactory(type).model;
				column.key = propPath;
				column.title = startCase(propPath);
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