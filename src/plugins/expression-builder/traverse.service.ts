import { Injectable } from '@angular/core';
import { Node } from './model/node';

@Injectable()
export class TraverseService {
	depth(root: Node) {
		return (reduce, memo) => {
			memo = this.visitLine(reduce, memo, root, root.line);

			const children = root.children;
			const length = children.length;

			for (let i = 0; i < length; i++) {
				memo = this.depth(children[i])(reduce, memo);
			}

			return memo;
		};
	}

	private visitLine(reduce, memo, node, line) {
		const groups = line.expressions;
		const length = groups.length;

		for (let i = 0; i < length; i++) {
			memo = this.visitGroup(reduce, memo, node, line, groups[i]);
		}

		return memo;
	}

	private visitGroup(reduce, memo, node, line, group) {
		const expressions = group.expressions;
		const length = expressions.length;

		for (let i = 0; i < length; i++) {
			memo = reduce(memo, expressions[i], line, node);
		}

		return memo;
	}
}
