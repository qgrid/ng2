export abstract class Expression {
	id: string;
	type: string;
	templateUrl = '';
	method: string[] = [];
}

export class GroupExpression extends Expression {
	public expressions: Expression[] = [];

	constructor() {
		super();

		this.type = 'group';
	}
}

export class EmptyExpression extends Expression {
	constructor() {
		super();

		this.type = 'empty';
	}
}
