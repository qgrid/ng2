import { cloneDeep, Expression } from '@qgrid/core';
import { GridError } from '@qgrid/ngx';

import { ISerializationGroup, ISerializationNode } from '../../expression-builder/serialization.service';
import { camelCaseMapping } from './operator';

export function visit(item: ISerializationNode): Expression {
  switch (item.id) {
    case '#root':
      return visit(item.children[0]);
    case '#logical': {
      const group = visitGroup(item);
      if (group) {
        if (!(group.left || group.right)) {
          return null;
        }
      }

      return group;
    }
    case '#condition':
      return visitCondition(item);
    default:
      throw new GridError('converter', `Invalid kind ${item.kind}`);
  }
}

function visitGroup(node: ISerializationNode): Expression {
  const line = node.line;
  const opExpr = find(line, '#logical-op', '#logical-op');
  const children = node.children.filter(notPlaceholder).map(visit);

  if (children.length === 0) {
    return null;
  }

  if (children.length === 1) {
    return {
      kind: 'group',
      op: opExpr.value.toLowerCase(),
      left: children[0],
      right: null,
    };
  }

  return children
    .slice(1)
    .reduce((memo, item) => ({
      kind: 'group',
      op: opExpr.value.toLowerCase(),
      left: memo,
      right: item,
    }), children[0]);
}

function visitCondition(node: ISerializationNode) {
  const line = node.line;
  const opExpr = find(line, '#operator', '#operator');
  const value = opExpr.value.toUpperCase();

  let condition: Expression = { kind: 'condition' } as Expression;
  switch (value) {
    case 'IS NOT EMPTY':
    case 'IS EMPTY':
      condition = { ...condition, ...visitUnary(line, opExpr.value) };
      break;
    case 'EQUALS':
    case 'NOT EQUALS':
    case 'GREATER OR EQ. TO':
    case 'GREATER THAN':
    case 'LESS OR EQ. TO':
    case 'LESS THAN':
    case 'LIKE':
    case 'NOT LIKE':
    case 'STARTS WITH':
    case 'ENDS WITH':
      condition = { ...condition, ...visitBinary(line, opExpr.value) };
      break;
    case 'BETWEEN':
      condition = { ...condition, ...visitBetween(line) };
      break;
    case 'IN':
      condition = { ...condition, ...visitIn(line) };
      break;
    default:
      throw new GridError('converter', `Invalid operation ${value}`);
  }
  return condition;
}

function visitUnary(line: ISerializationGroup[], op: string): Omit<Expression, 'right' | 'kind'> {
  const left = visitField(line);

  return {
    left: left.value,
    op: camelCaseMapping[op.toUpperCase() as keyof typeof camelCaseMapping],
  };
}

function visitBinary(line: ISerializationGroup[], op: string): Omit<Expression, 'kind'> {
  const left = visitField(line);
  const right = find(line, '#operand', '#value') || find(line, '#fieldRight');

  return {
    left: left.value,
    op: camelCaseMapping[(op.toUpperCase() as keyof typeof camelCaseMapping)],
    right: right.value,
  };
}

function visitIn(line: ISerializationGroup[]): Omit<Expression, 'kind'> {
  const left = visitField(line);
  const right = find(line, '#operand', '#in-operand') || find(line, '#fieldRight');

  return {
    left: left.value,
    op: 'in',
    right: cloneDeep(right.values) || right.value,
  };
}

function visitBetween(line: ISerializationGroup[]): Omit<Expression, 'kind'> {
  const left = visitField(line);
  const from = find(line, '#operand', '#from') || find(line, '#fieldFrom');
  const to = find(line, '#operand', '#to') || find(line, '#fieldTo');

  return {
    left: left.value,
    op: 'between',
    right: [from.value, to.value],
  };
}

function visitField(line: ISerializationGroup[]) {
  return find(line, '#field') || find(line, '#fieldLeft');
}

function notPlaceholder(node: ISerializationNode) {
  return !node.attributes.placeholder;
}

function find(line: ISerializationGroup[], groupId: string, exprId?: string) {
  const group = findById(line, groupId);
  if (!group) {
    return null;
  }

  return findById(group.expressions, exprId || groupId);
}

function findById<T extends { id: string }>(items: T[], id: string) {
  const result = items.filter(item => item.id === id);
  const length = result.length;

  if (length === 1) {
    return result[0];
  }

  if (length > 1) {
    throw new GridError('converter', `Ambiguous id ${id}`);
  }

  return null;
}
