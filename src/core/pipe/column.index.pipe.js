import { Guard } from '../infrastructure/guard';
import { flatten } from '../column/column.matrix';
import { Node } from '../node/node';

export function columnIndexPipe(root, context, next) {
	Guard.notNull(root, 'root');

	const { model } = context;
	const filteredIndex = filter(model, root);
	const columnRows = flatten(filteredIndex);

	next({ columns: columnRows, index: root });
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
