import {View} from '../view/view';
import {Command} from '../command/command';
import {ColumnModel} from '../column-type/column.model';
import {IIndexResult, IMapResult} from './sort.service';

export declare class SortView extends View {
	constructor(model: any);
	hover: boolean;
	toggle: Command;
	direction(column: ColumnModel): IMapResult;
	order(column: ColumnModel): IIndexResult;
}
