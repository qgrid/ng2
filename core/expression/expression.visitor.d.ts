import {IExpression} from './expression.build';

export declare class Visitor {
	constructor();

	visit(item: IExpression, depth: number): void;
	visitGroup(group: IExpression, depth: number): void;
	visitCondition(condition: IExpression, depth: number): void;
	visitUnary(condition: IExpression): void;
	visitBinary(condition: IExpression, depth: number): void;
	visitLeft(left: IExpression): void;
	visitBetween(condition: IExpression, depth: number): void;
	visitIn(condition: IExpression, depth: number): void;
	visitFunction(item: IExpression, depth: number): void;
	visitArguments(args: any[]): void;
}
