import { Visitor } from './expression.visitor';

export declare class PredicateVisitor extends Visitor {
	constructor(valueFactory: (name: string) => (row: any) => any);
}
