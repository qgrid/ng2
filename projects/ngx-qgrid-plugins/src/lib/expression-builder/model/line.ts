import { GridError } from '@qgrid/ngx';
import { cloneDeep } from '@qgrid/core/utility/kit';
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
	readonly expressions: Expression[] = [];

	constructor(private GroupSchemaT: typeof GroupSchema) {
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

	add(expression: Expression) {
		this.expressions.push(expression);
	}

	clone(id: string) {
		return cloneDeep(this.get(id)) as Expression;
	}

	get(id: string) {
		const expression = this.findById(this.expressions, id);
		if (!expression) {
			throw new GridError('line', `Expression ${id} not found`);
		}

		return expression.expression;
	}

	put(id: string, node: Node, build) {
		const index = this.getIndex(id);
		const schema = new this.GroupSchemaT(node, this);
		const group = new GroupExpression();

		const item = this.findById(this.expressions, id);
		if (item.expression instanceof GroupExpression) {
			build(schema);
			schema.apply(group);
			group.id = id;
			this.expressions.splice(index, 1, group);
			this.immutable = false;
		} else {
			throw new GridError('line', 'Unsupported operation: put to expression, that is not a group');
		}
	}

	remove(id) {
		const item = this.findById(this.expressions, id);
		const expressions = item.parent ? item.parent.expressions : this.expressions;
		if (item.expression instanceof GroupExpression) {
			item.expression.expressions = [];
		} else {
			throw new GridError('line', 'Unsupported operation: remove expression, that is not a group');
		}
	}
}
