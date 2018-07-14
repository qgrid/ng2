import { Guard } from '../infrastructure/guard';
import { flatten } from '../column/column.matrix';
import { Node } from '../node/node';

export function columnIndexPipe(root, context, next) {
	Guard.notNull(root, 'root');

	const { model } = context;
	const sortedIndex = sort(model, root);
	const filteredIndex = filter(model, sortedIndex);
	const columnRows = flatten(filteredIndex);

	next({ columns: columnRows, index: sortedIndex });
}

function filter(model, root) {
	const groupBy = new Set(model.group().by);
	const pivotBy = new Set(model.pivot().by);

	function doFilter(node, newNode) {
		const { children } = node;
		for (let i = 0, length = children.length; i < length; i++) {
			const child = children[i];
			const view = child.key;
			const { isVisible, key } = view.model;
			if (isVisible && !groupBy.has(key) && !pivotBy.has(key)) {
				const newChild = new Node(child.key, child.level);
				newNode.children.push(newChild);
				doFilter(child, newChild);
			}
		}

		return newNode;
	}

	return doFilter(root, new Node(root.key, root.level));
}

function sort(model, root) {
	// const buildIndex = sortIndexFactory(model);
	// const { index } = model.columnList();
	// const pathMap = new Map();
	// preOrderDFS([index], (node, memo, parent, index) => {
	// 	const { key } = node.key.model;
	// 	const path = `${memo}\\${key}`;
	// 	const entry = { node, parent, index, path };
	// 	pathMap.set(key, entry);
	// 	pathMap.set(path, entry);
	// 	return path;
	// }, '');

	// preOrderDFS([root], (node, memo, parent, index) => {
	// 	const { key } = node.key.model;
	// 	const path = `${memo}\\${key}`;
	// 	const entry = pathMap.get(key);
	// 	if (entry) {

	// 	}

	// 	return path;
	// }, '');

	// for (let node of entries) {
	// 	const
	// }

	return root;
}