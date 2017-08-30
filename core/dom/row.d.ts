import {Element} from './element';
import {Row as RowModel} from '../row/row';
import {Box} from './box';
import {Cell} from './cell';

export declare class Row extends Element {
	constructor(box: Box, index: number, element: HTMLElement);

	cells(): Cell[]

	cell(columnIndex: number): Cell;
}
