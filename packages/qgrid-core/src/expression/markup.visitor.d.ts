import { Visitor } from './expression.visitor';

export declare class MarkupVisitor extends Visitor {
	constructor(
		label: (key: string) => string,
		type: (key: string) => string,
		isValid: (key: string, value: any) => boolean
	);
}
