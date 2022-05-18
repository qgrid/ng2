import { GroupExpression, Expression } from './model/expression';
import { Line } from './model/line';
import { Node } from './model/node';

type TraverseReduce<T> = (memo: T, expresseion: Expression, line: Line, node: Node) => T;

export class TraverseService<T> {
  findUp(node: Node, test: (foundNode: Node) => boolean) {
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

  depth(root: Node): (reduce: TraverseReduce<T>, memo: T) => T {
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

  private visitLine(reduce: TraverseReduce<T>, memo: T, node: Node, line: Line) {
    const groups = line.expressions as GroupExpression[];
    const length = groups.length;

    for (let i = 0; i < length; i++) {
      memo = this.visitGroup(reduce, memo, node, line, groups[i]);
    }

    return memo;
  }

  private visitGroup(reduce: TraverseReduce<T>, memo: T, node: Node, line: Line, group: GroupExpression) {
    const expressions = group.expressions;
    const length = expressions.length;

    for (let i = 0; i < length; i++) {
      memo = reduce(memo, expressions[i], line, node);
    }

    return memo;
  }
}
