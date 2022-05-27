import { cloneDeep } from '@qgrid/core';
import { GridError } from '@qgrid/ngx';
import { Expression, GroupExpression } from './expression';
import { GroupSchema } from './group.schema';
import { Node } from './node';

interface ExpressionEntry {
  index: number;
  expression: Expression;
  parent: GroupExpression;
}

export class Line {
  immutable = true;
  readonly expressions: GroupExpression[] = [];

  constructor(
    private GroupSchemaT: typeof GroupSchema,
  ) { }

  add(expression: GroupExpression) {
    this.expressions.push(expression);
  }

  clone(id: string): GroupExpression {
    return cloneDeep(this.get(id));
  }

  get(id: string): GroupExpression {
    const expression = this.findById(this.expressions, id);
    if (!expression) {
      throw new GridError('line', `Expression ${id} not found`);
    }

    return expression.expression as GroupExpression;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T extends { apply: (...args: any[]) => any }>(id: string, node: Node, build: (schema: T) => void) {
    const index = this.getIndex(id);
    const groupSchema = new this.GroupSchemaT(node, this);
    const group = new GroupExpression();

    const item = this.findById(this.expressions, id);
    if (item.expression instanceof GroupExpression) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      build(groupSchema as any);
      groupSchema.apply(group);
      group.id = id;
      this.expressions.splice(index, 1, group);
      this.immutable = false;
    } else {
      throw new GridError('line', 'Unsupported operation: put to expression, that is not a group');
    }
  }

  remove(id: string) {
    const item = this.findById(this.expressions, id);
    if (item.expression instanceof GroupExpression) {
      item.expression.expressions = [];
    } else {
      throw new GridError('line', 'Unsupported operation: remove expression, that is not a group');
    }
  }

  private getIndex(id: string) {
    const index = this.expressions.findIndex(item => item.id === id);
    if (index < 0) {
      throw new GridError('line', `Expression ${id} not found`);
    }

    return index;
  }

  private findById(expressions: Expression[], id: string, parent: GroupExpression = null): ExpressionEntry {
    for (let index = 0, length = expressions.length; index < length; index++) {
      const expression = expressions[index];
      if (expression.id === id) {
        return { index, expression, parent };
      }
      if (expression instanceof GroupExpression) {
        const group = expression as GroupExpression;
        const groupChild = this.findById(group.expressions, id, group);
        if (groupChild) {
          return groupChild;
        }
      }
    }

    return null;
  }
}
