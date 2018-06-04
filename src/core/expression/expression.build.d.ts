export interface Expression {
	kind: string;
	op: string;
	left: object;
	right: object;
}

export declare function build(filterBy: object, op: string): Expression;
