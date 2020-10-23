import { Visitor } from './expression.visitor';
import { Assert } from '../filter/assert';

export declare class PredicateVisitor extends Visitor {
	constructor(
		valueFactory: (name: string) => (row: any) => any,
		assertFactory: (name: string) => Assert,
		getType: (name: string) => string,
	);
}
