import { Node } from './node';
import { cloneDeep } from '../utility/kit';
import { AppError } from '../infrastructure/error';

export function preOrderDFS(nodes, visit, memo = null, parent = null) {
	for (let i = 0, length = nodes.length; i < length; i++) {
		const node = nodes[i];
		const nodeMemo = visit(node, memo, parent, i);
		preOrderDFS(node.children, visit, nodeMemo, node);
	}

	return memo;
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

export function calk(node) {
	const result = new Node(node.key, node.level, node.type);
	result.rows = Array.from(node.rows);
	result.children = Array.from(node.children);
	result.state = cloneDeep(node.state);
	result.source = node.source;
	return result;
}

export function copy(node) {
	const result = new Node(node.key, node.level, node.type);
	result.source = node.source;
	return result;
}

export function bend(line) {
	if (line.length === 0) {
		throw new AppError('node.service', 'Line have no nodes');
	}
	const root = new Node(line[0].key, 0, line[0].type);
	const parentStack = [root];
	for (let i = 1; i < line.length; i++) {
		const source = line[i];
		let last = parentStack[parentStack.length-1];
		if (source.level <= last.level) {
			do {
				parentStack.pop();
				last = parentStack[parentStack.length-1];
			} while (source.level <= last.level);
		}
		const newNode = new Node(source.key, last.level + 1, source.type);
		last.children.push(newNode);
		parentStack.push(newNode);
	}
	return root;
}
