import { AppError } from '../infrastructure/error';
import { Node } from './node';

export function nodeBuilder(columnMap, groupBy, valueFactory, level = 0) {
	if (groupBy.length === 0) {
		return () => [];
	}

	const groupKey = groupBy[0];
	if (!columnMap.hasOwnProperty(groupKey)) {
		throw new AppError('node.build', `can't find column "${groupKey}"`);
	}

	const column = columnMap[groupKey];
	const getValue = valueFactory(column);
	return (rows, getRowIndex = (i) => i) => {
		const keys = [];
		const nodes = [];
		const groups = {};
		for (let i = 0, length = rows.length; i < length; i++) {
			const row = rows[i];
			const index = getRowIndex(i);
			const key = getValue(row);
			if (!groups.hasOwnProperty(key)) {
				const node = new Node(key, level);
				node.rows.push(index);
				keys.push(key);
				nodes.push(node);
				groups[key] = {
					node,
					rows: [row]
				};
			}
			else {
				const group = groups[key];
				group.node.rows.push(index);
				group.rows.push(row);
				keys.push(key);
			}
		}

		const nextGroupBy = groupBy.slice(1);
		if (nextGroupBy.length) {
			const build = nodeBuilder(columnMap, nextGroupBy, valueFactory, level + 1);
			for (let i = 0, length = keys.length; i < length; i++) {
				const key = keys[i];
				const group = groups[key];
				const node = group.node;
				const rows = node.rows;
				node.children = build(group.rows, i => rows[i]);
			}
		}

		return nodes;
	};
}