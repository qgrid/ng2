import { Node } from './model/node';
import {Line} from './model/line';

export class TraverseService {
	findUp(node: Node | any, test: (node: Node) => boolean) {
		while (node) {
			if (test(node)) {
				return node;
			}

			node = node.parent;
		}

		return null;
	}

	findUpSibling(node: Node) {
		if (node.parent) {
			const children = node.parent.children;
			const index = children.indexOf(node);
			if (index >= 0) {
				if (index > 0) {
					return children[index - 1];
				}

				return node.parent;
			}
		}

		return null;
	}

	depth(root: Node): (reduce: any, memo: any) => any {
		return (reduce, memo) => {
			memo = this.visitLine(reduce, memo, root, root.line);

			const children: Node[] | any[] = root.children;
			const length = children.length;

			for (let i = 0; i < length; i++) {
				memo = this.depth(children[i])(reduce, memo);
			}

			return memo;
		};
	}

	private visitLine(reduce: any, memo: any, node: Node, line: Line) {
		const groups = line.expressions;
		const length = groups.length;

		for (let i = 0; i < length; i++) {
			memo = this.visitGroup(reduce, memo, node, line, groups[i]);
		}

		return memo;
	}

	private visitGroup(reduce: any, memo: any, node: Node, line: Line, group: any) {
		const expressions = group.expressions;
		const length = expressions.length;

		for (let i = 0; i < length; i++) {
			memo = reduce(memo, expressions[i], line, node);
		}

		return memo;
	}
}
