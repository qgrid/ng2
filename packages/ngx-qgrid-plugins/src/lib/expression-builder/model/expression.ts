export abstract class Expression {
	id!: string;
	type!: string;
	templateUrl = '';
	method: string[] = [];
}

export class GroupExpression extends Expression {
	expressions: Expression[] = [];

	constructor() {
		super();

		this.type = 'group';
		this.templateUrl = 'eb-group.tpl.html';
	}
}

