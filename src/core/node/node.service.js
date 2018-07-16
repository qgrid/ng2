import { Node } from './node';
import { cloneDeep } from '../utility/kit';

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
		return new Node('$root', 0);
	}
	const root = new Node(line[0].key, 0, line[0].type);
	const levelMap = new Map();
	levelMap.set(0, root);
	for (let i = 1; i < line.length; i++) {
		const source = line[i];
		const parentLevel = Array.from(levelMap.keys())
			.find(level => level < source.level);
		const parentNode = levelMap.get(parentLevel);
		const nextLevel = parentLevel + 1;
		const node = new Node(source.key, nextLevel, source.type);
		parentNode.children.push(node);
		levelMap.set(nextLevel, node);
	}
	return result;
}
