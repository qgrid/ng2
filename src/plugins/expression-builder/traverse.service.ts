import { Injectable } from '@angular/core';
import { Node } from './model/node';

@Injectable()
export class TraverseService {
	static depth(root: Node) {
		return (reduce, memo) => {
			memo = TraverseService.visitLine(reduce, memo, root, root.line);

			const children = root.children;
			const length = children.length;

			for (let i = 0; i < length; i++) {
				memo = TraverseService.depth(children[i])(reduce, memo);
			}

			return memo;
		};
	}

	private static visitLine(reduce, memo, node, line) {
		const groups = line.expressions;
		const length = groups.length;

		for (let i = 0; i < length; i++) {
			memo = TraverseService.visitGroup(reduce, memo, node, line, groups[i]);
		}

		return memo;
	}

	private static visitGroup(reduce, memo, node, line, group) {
		const expressions = group.expressions;
		const length = expressions.length;

		for (let i = 0; i < length; i++) {
			memo = reduce(memo, expressions[i], line, node);
		}

		return memo;
	}
}
