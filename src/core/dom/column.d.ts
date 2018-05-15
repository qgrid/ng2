import {Box} from './box';
import {Cell} from './cell';

export declare class Column {
	constructor(box: Box, index: number);

	model(): any;
	cells(): Cell[];
	cell(rowIndex: number): Cell;
	addClass(name: string): void;
	removeClass(name: string): void;
}
