import {View} from '../view/view';
import {Table} from "../dom/table";
import {Model} from "../infrastructure/model";

export declare type ReturnBooleanOrNull = boolean | null;

export declare class RowDetailsView extends View {
	constructor(model: Model, public table: Table);

	status(row: any): ReturnBooleanOrNull;
}