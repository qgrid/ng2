import { GridError } from '../infrastructure/error';

export class Visitor {
	constructor() {
	}

	visit(item, depth = 0) {
		switch (item.kind) {
			case 'group':
				return this.visitGroup(item, depth + 1);
			case 'condition':
				return this.visitCondition(item, depth);
			case 'function':
				return this.visitFunction(item, depth);
			default:
				throw GridError(
					'expression.visitor',
					`Invalid kind ${item.kind}`
				);
		}
	}

	visitGroup(group, depth) {
		if (group.right) {
			this.visit(group.left, depth);
			this.visit(group.right, depth);
		}

		return this.visit(group.left, depth);
	}

	visitCondition(condition, depth) {
		switch (condition.op) {
			case 'isNotNull':
			case 'isNull':
			case 'isNotEmpty':
			case 'isEmpty':
			case 'isNumeric':
			case 'isNotNumeric':
				return this.visitUnary(condition, depth);
			case 'equals':
			case 'notEquals':
			case 'greaterThanOrEquals':
			case 'greaterThan':
			case 'lessThanOrEquals':
			case 'lessThan':
			case 'like':
			case 'notLike':
			case 'startsWith':
			case 'endsWith':
			case 'match':
				return this.visitBinary(condition, depth);
			case 'between':
				return this.visitBetween(condition, depth);
			case 'in':
				return this.visitIn(condition, depth);
			default:
				throw new GridError(
					'expression.visitor',
					`Invalid operation ${condition.op}`
				);
		}
	}

	visitUnary(condition) {
		this.visitLeft(condition.left);
	}

	visitBinary(condition/*, depth*/) {
		this.visitLeft(condition.left);
		this.visitRight(condition.right);
	}

	visitLeft(left) {
		if (left.kind) {
			switch (left.kind) {
				case 'function':
					this.visitArguments(left.arguments);
			}
		}
	}

	visitBetween(/*condition, depth*/) {
	}

	visitIn(/*condition, depth*/) {
	}

	visitFunction(/*fn*/) {
	}

	visitArguments(args) {
		return args.map(arg => {
			switch (arg.kind) {
				case 'condition':
				case 'group':
					this.visit(arg);
			}
		});
	}
}