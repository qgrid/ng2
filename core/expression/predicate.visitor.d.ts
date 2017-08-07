import {Visitor} from './expression.visitor';
import {IValueFactory} from "../services/value";

export declare class PredicateVisitor extends Visitor {
	constructor(public valueFactory: IValueFactory);

}