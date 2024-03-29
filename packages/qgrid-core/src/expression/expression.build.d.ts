export interface Expression {
	kind: string;
	op: string;
	left: Expression | string;
	right: Expression | any;
}

export declare function buildExpression(filterBy: { [key: string]: any }, op: string): Expression;
