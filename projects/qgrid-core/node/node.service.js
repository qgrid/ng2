import { Node } from './node';
import { cloneDeep } from '../utility/kit';
import { GridError } from '../infrastructure/error';

export function preOrderDFS(nodes, visit, memo = null, parent = null) {
	for (let i = 0, length = nodes.length; i < length; i++) {
		const node = nodes[i];
		const nodeMemo = visit(node, memo, parent, i);
		preOrderDFS(node.children, visit, nodeMemo, node);
	}

	return memo;
}

export function filter(node, test, parent = null) {
	const { children } = node;
	node = copy(node);

	let result = false;
	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i];
		result = filter(child, test, node) || result;
	}

	if (parent) {
		if (result || test(node)) {
			parent.children.push(node);
			return true;
		}

		return false;
	}

	return node;
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
	result.value = node.value;
	return result;
}

export function copy(node) {
	const result = new Node(node.key, node.level, node.type);
	result.value = node.value;
	result.source = node.source;
	result.state.expand = node.state.expand;
	return result;
}

export function bend(line) {
	if (line.length === 0) {
		throw new GridError('node.service', 'Line have no nodes');
	}

	const root = copy(line[0]);
	const parentStack = [root];
	for (let i = 1, length = line.length; i < length; i++) {
		const current = line[i];

		let parent = parentStack[parentStack.length - 1];
		while (current.level <= parent.level) {
			parentStack.pop();
			parent = parentStack[parentStack.length - 1];
		}

		const child = copy(current);
		child.level = parent.level + 1;

		parent.children.push(child);
		parentStack.push(child);
	}

	return root;
}
