import { Node } from './node';

export function traverse(nodes, visit) {
	for (let i = 0, length = nodes.length; i < length; i++) {
		const node = nodes[i];
		if (visit(node) !== false) {
			traverse(node.children, visit);
		}
	}
}

export function flatView(nodes, result = []) {
	for (let i = 0, nodesLength = nodes.length; i < nodesLength; i++) {
		const node = nodes[i];
		result.push(node);

		if (node.state.expand) {
			const children = node.children;
			if (children.length) {
				flatView(children, result);
			}
			else {
				const rows = node.rows;
				for (let j = 0, rowsLength = rows.length; j < rowsLength; j++) {
					const row = rows[j];
					const rowNode = new Node(node.key, node.level + 1, 'row');
					rowNode.rows = [row];
					children.push(rowNode);
					result.push(rowNode);
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