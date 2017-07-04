import {View} from '../view/view';
import {Command} from '../infrastructure/command';
import {Model} from "../infrastructure/model";
import {ColumnModel} from "../column-type/column.model";
import {IIndexResult, IMapResult} from "./sort.service";

export declare class SortView extends View {
	constructor(model: Model);

	hover: boolean;
	toggle: Command;

	onInit(): void;

	equals(x: object, y: object): boolean;

	direction(column: ColumnModel): IMapResult;

	order(column: ColumnModel): IIndexResult;
}