import { Node } from './node';
import { noop, cloneDeep } from '../utility/kit';

export function preOrderDFS(nodes, visit, memo = null, parent = null) {
	for (let i = 0, length = nodes.length; i < length; i++) {
		const node = nodes[i];
		const nodeMemo = visit(node, memo, parent, i);
		preOrderDFS(node.children, visit, nodeMemo, node);
	}
}

export function flattenFactory(model) {
	const { mode, summary } = model.group();

	let push = (node, pos, result) => result.push(node);
	switch (mode) {
		case 'rowspan': {
			push = (node, pos, result) => {
				if (node.level === 0 || pos > 0) {
					result.push(node);
				}
			}
			break;
		}
	}

	let pushSummary = noop;
	switch (summary) {
		case 'leaf': {
			pushSummary = (node, pos, result, parent, posInParent) => {
				if (parent && parent.children.length - 1 === posInParent) {
					const { level, key } = node;
					const summary = new Node(`${key}-group-summary`, level, 'summary');
					summary.rows = Array.from(node.rows);
					result.push(summary);
				}
			};
			break;
		}
	}

	return function flatView(nodes, result = [], parent = null, pos = 0) {
		for (let i = 0, iLength = nodes.length; i < iLength; i++) {
			const node = nodes[i];
			push(node, i, result, parent, pos);

			if (node.state.expand) {
				const children = node.children;
				if (children.length) {
					flatView(children, result, node, i);
				}
				else {
					const { rows, level, key } = node;
					const nextLevel = level + 1;
					for (let j = 0, jLength = rows.length; j < jLength; j++) {
						const child = new Node(key, nextLevel, 'row');
						const row = rows[j];
						child.rows = [row];

						children.push(child);
						push(child, j, result, parent, pos);
					}
				}

				pushSummary(node, i, result, parent, pos);
			}
		}

		return result;
	};
}

export function findFirstLeaf(node) {
	if (node.type !== 'group') {
		return node;
	}

	if (!node.state.expand) {
		return null;
	}

	return node.children.length && findFirstLeaf(node.children[0]);
}

export function find(node, test, parent = null, index = -1) {
	if (test(node)) {
		return { node, parent, index };
	}

	const { children } = node;
	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i];
		const result = find(child, test, node, i);
		if (result) {
			return result;
		}
	}

	return null;
}

export function copy(node) {
	const result = new Node(node.key, node.level, node.type);
	result.rows = Array.from(node.rows);
	result.children = Array.from(node.children);
	result.state = cloneDeep(node.state);
	result.source = node.source;
	return result;
}
