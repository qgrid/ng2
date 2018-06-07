import { Node } from './node';
import { noop } from '../utility/kit';

export function traverse(nodes, visit) {
	for (let i = 0, length = nodes.length; i < length; i++) {
		const node = nodes[i];
		if (visit(node) !== false) {
			traverse(node.children, visit);
		}
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

export function some(nodes, test) {
	for (let node of nodes) {
		if (test(node)) {
			return true;
		}

		if (some(node.children, test)) {
			return true;
		}
	}

	return false;
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