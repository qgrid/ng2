import {Box} from './box';
import {Cell} from "./cell";

export declare class Column {
	constructor(public box: Box, public index: number);

	cells(): Cell[];

	cell(rowIndex: number): Cell;

	addClass(name: string): void;

	removeClass(name: string): void;
}