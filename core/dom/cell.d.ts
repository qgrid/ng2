import {Element} from './element';
import {Cell as CellModel} from '../cell/cell';
import {IContext} from "./box";


export declare class Cell extends Element {
	constructor(public context: IContext, public rowIndex: number, public columnIndex: number, element: HTMLElement);

	readonly model: CellModel;
}