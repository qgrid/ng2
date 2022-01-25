import { cloneDeep } from '@qgrid/core';
import { GridError } from '@qgrid/ngx';
import { camelCaseMapping } from './operator';

export function visit(item: any): any {
	switch (item.id) {
		case '#root':
			return visit(item.children[0]);
		case '#logical':
			const group = visitGroup(item);
			if (group) {
				if (!(group.left || group.right)) {
					return null;
				}
			}

			return group;
		case '#condition':
			return visitCondition(item);
		default:
			throw new GridError('converter', `Invalid kind ${item.kind}`);
	}
}

function visitGroup(node: any) {
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
			right: null
		};
	}

	return children
		.slice(1)
		.reduce((memo: any, item: any) => ({
			kind: 'group',
			op: opExpr.value.toLowerCase(),
			left: memo,
			right: item
		}), children[0]);
}

function visitCondition(node: any) {
	const line = node.line;
	const opExpr = find(line, '#operator', '#operator');
	const value = opExpr.value.toUpperCase();

	let condition: any;
	switch (value) {
		case 'IS NOT EMPTY':
		case 'IS EMPTY':
			condition = visitUnary(line, opExpr.value);
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
			condition = visitBinary(line, opExpr.value);
			break;
		case 'BETWEEN':
			condition = visitBetween(line);
			break;
		case 'IN':
			condition = visitIn(line);
			break;
		default:
			throw new GridError('converter', `Invalid operation ${value}`);
	}

	condition.kind = 'condition';
	return condition;
}

function visitUnary(line: any, op: any) {
	const left = visitField(line);

	return {
		left: left.value,
		op: camelCaseMapping[op.toUpperCase()]
	};
}

function visitBinary(line: any, op: any) {
	const left = visitField(line);
	const right = find(line, '#operand', '#value') || find(line, '#fieldRight');

	return {
		left: left.value,
		op: camelCaseMapping[op.toUpperCase()],
		right: right.value
	};
}

function visitIn(line: any) {
	const left = visitField(line);
	const right = find(line, '#operand', '#in-operand') || find(line, '#fieldRight');

	return {
		left: left.value,
		op: 'in',
		right: cloneDeep(right.values) || right.value
	};
}

function visitBetween(line: any) {
	const left = visitField(line);
	const from = find(line, '#operand', '#from') || find(line, '#fieldFrom');
	const to = find(line, '#operand', '#to') || find(line, '#fieldTo');

	return {
		left: left.value,
		op: 'between',
		right: [from.value, to.value]
	};
}

function visitField(line: any) {
	return find(line, '#field') || find(line, '#fieldLeft');
}

function notPlaceholder(node: any) {
	return !node.attributes.placeholder;
}

function find(line: any, groupId: string, exprId?: string) {
	const group = findById(line, groupId);
	if (!group) {
		return null;
	}

	return findById(group.expressions, exprId || groupId);
}

function findById(items: any[], id: string) {
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
