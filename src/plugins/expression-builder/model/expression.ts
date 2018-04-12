export interface Expression {
	type: string;
	template: string;
}

export class ExpressionGroup implements Expression {
	public readonly type = 'group';
	public readonly template = 'expression-builder.group';
	public expressions: any[];

	constructor() {
		this.expressions = [];
	}
}

export class EmptyExpression implements Expression {
	public readonly type = 'empty';
	public readonly template = '';
}
