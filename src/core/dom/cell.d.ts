import { Element } from './element';
import { Td } from './td';
import { BoxContext } from './box';

export declare class Cell extends Element {
	constructor(context: BoxContext, rowIndex: number, columnIndex: number, element: HTMLElement);

	model(): Td;
}
