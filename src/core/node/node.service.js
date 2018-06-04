import { Node } from './node';

export function traverse(nodes, visit) {
	for (let i = 0, length = nodes.length; i < length; i++) {
		const node = nodes[i];
		if (visit(node) !== false) {
			traverse(node.children, visit);
		}
	}
}

export function flatView(nodes, mode, result = []) {
	for (let i = 0, nodeLength = nodes.length; i < nodeLength; i++) {
		const node = nodes[i];
		if (mode !== 'rowspan' || node.level === 0 || i > 0) {
			result.push(node);
		}

		if (node.state.expand) {
			const children = node.children;
			if (children.length) {
				flatView(children, mode, result);
			}
			else {
				const rows = node.rows;
				for (let j = 0, rowLength = rows.length; j < rowLength; j++) {
					const row = rows[j];
					const rowNode = new Node(node.key, node.level + 1, 'row');
					rowNode.rows = [row];
					children.push(rowNode);
					if (mode !== 'rowspan' || node.level === 0 || j > 0) {
						result.push(rowNode);
					}
				}
			}
		}
	}

	return result;
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