import { Expression } from './expression.build';

export declare class Visitor {
	constructor();

	visit(item: Expression, depth?: number): any;
	visitGroup(group: Expression, depth: number): any;
	visitCondition(condition: Expression, depth: number): any;
	visitUnary(condition: Expression): any;
	visitBinary(condition: Expression, depth: number): any;
	visitLeft(left: Expression): any;
	visitBetween(condition: Expression, depth: number): any;
	visitIn(condition: Expression, depth: number): any;
	visitFunction(item: Expression, depth: number): any;
	visitArguments(args: any[]): any;
}
