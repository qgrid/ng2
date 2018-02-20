import {Element} from './element';
import {CellView} from '../scene/view/cell.view';
import {IBoxContext} from './box';

export declare class Cell extends Element {
	constructor(context: IBoxContext, rowIndex: number, columnIndex: number, element: HTMLElement);

	model(): CellView;
}
