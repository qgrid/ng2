import { Node } from './node';
import { cloneDeep } from '../utility/kit';

export function preOrderDFS(nodes, visit, memo = null, parent = null) {
	for (let i = 0, length = nodes.length; i < length; i++) {
		const node = nodes[i];
		const nodeMemo = visit(node, memo, parent, i);
		preOrderDFS(node.children, visit, nodeMemo, node);
	}
}

export function findLeaves(node, result = []) {
	const { children } = node;
	if (!children.length) {
		result.push(node);
		return result;
	}

	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i];
		findLeaves(child, result);
	}

	return result;
}

export function find(node, test, parent = null, index = -1, path = []) {
	if (test(node)) {
		return { node, parent, index, path };
	}

	path = path.slice();
	path.push(node);

	const { children } = node;
	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i];
		const result = find(child, test, node, i, path);
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
