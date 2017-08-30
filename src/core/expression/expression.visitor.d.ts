import {IRoot} from './expression.build';

export declare class Visitor {
	constructor();
	visit(item: IRoot, depth: number): void;
	visitGroup(group: IRoot, depth: number): void;
	visitCondition(condition: IRoot, depth: number): void;
	visitUnary(condition: IRoot): void;
	visitBinary(condition: IRoot, depth: number): void;
	visitLeft(left: IRoot): void;
	visitBetween(condition: IRoot, depth: number): void;
	visitIn(condition: IRoot, depth: number): void;
	visitFunction(item: IRoot, depth: number): void;
	visitArguments(args: any[]): void;
}
