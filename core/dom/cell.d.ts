import {Element} from './element';
import {CellView} from '../scene/view/cell.view';
import {IContext} from './box';

export declare class Cell extends Element {
	constructor(context: IContext, rowIndex: number, columnIndex: number, element: HTMLElement);

	model(): CellView;
}
