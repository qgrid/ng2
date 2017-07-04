import {Element} from './element';
import {Row as RowModel} from '../row/row';
import {Box} from "./box";
import {Cell} from "./cell";

export declare class Row extends Element {
	constructor(public box: Box, public index: number, element: HTMLElement);

	readonly model: RowModel;

	cells(): Cell[]

	cell(columnIndex: number): Cell;
}