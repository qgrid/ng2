import {AppError} from 'ng2-qgrid/core/infrastructure';
import {cloneDeep} from 'ng2-qgrid/core/services/utility';
import {Expression, ExpressionGroup} from './expression';

export class Line {
	public immutable: boolean;
	public expressions: Expression[];

	constructor(private GroupSchema) {
	}

	private getIndex(id) {
		const index = this.expressions.findIndex(item => item.id === id);

		if (index < 0) {
			throw new AppError('expression-builder.line', `Expression ${id} not found`);
		}

		return index;
	}

	private findById(expressions: Expression[], id, parent) {
		for (let i = 0, length = expressions.length; i < length; i++) {
			if (expressions[i].id === id) {
				return {
					index: i,
					expression: expressions[i],
					parent: parent
				};
			}
			if (expressions[i] instanceof ExpressionGroup) {
				const child = findById(expressions[i].expressions, id, expressions[i]);
				if (child) {
					return child;
				}
			}
		}
	}

	add(expression) {
		this.expressions.push(expression);
	}

	clone(id) {
	}

	get(id) {
		const expression = this.findById(this.expressions, id);

		if (!expression) {
			throw Error(`Expression ${id} not found`);
		}

		return expression.expression;
	}

	put(id, node, build) {
		const index = getIndex(id);
		const schema = new GroupSchema(node, this);
		const group = new ExpressionGroup();

		const item = this.findById(this.expressions, id);
		if (item.expression instanceof ExpressionGroup) {
			build(schema);
			schema.apply(group);
			group.id = id;
			this.expressions.splice(index, 1, group)
			this.immutable = false;
		} else {
			throw new Error('Unsupported operation: put to expression, that is not a group');
		}
	}

	remove(id) {
		const item = findById(this.expressions, id);
		const expressions = item.parent ? parent.expressions : this.expressions;
		if (item.expression instanceof ExpressionGroup) {
			item.expression.expressions = [];
		} else {
			throw new Error('Unsupported operation: remove expression, that is not a group');
		}
	}
}
