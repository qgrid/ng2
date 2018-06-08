import { Element } from './element';
import { Td } from './td';
import { IBoxContext } from './box';

export declare class Cell extends Element {
	constructor(context: IBoxContext, rowIndex: number, columnIndex: number, element: HTMLElement);

	model(): Td;
}
