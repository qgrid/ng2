import {IExpression} from './expression.build';

export declare class Visitor {
	constructor();

	visit(item: IExpression, depth?: number): any;
	visitGroup(group: IExpression, depth: number): any;
	visitCondition(condition: IExpression, depth: number): any;
	visitUnary(condition: IExpression): any;
	visitBinary(condition: IExpression, depth: number): any;
	visitLeft(left: IExpression): any;
	visitBetween(condition: IExpression, depth: number): any;
	visitIn(condition: IExpression, depth: number): any;
	visitFunction(item: IExpression, depth: number): any;
	visitArguments(args: any[]): any;
}
