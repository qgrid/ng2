import {View} from '../view/view';
import {ColumnModel} from "../column-type/column.model";
import {Model} from "../infrastructure/model";
import {getFactory as labelFactory} from '../services/label';
import {Table} from "../dom/table";
import {IGetResult} from "../services/value";

export interface IGetValueFactory{
	(column: ColumnModel): IGetResult;
}

export declare class BodyView extends View {
	constructor(model: Model, public table: Table);

	rows: any[];

	columns(row: any, pin: string): ColumnModel[];

	rowspan(row: any, column: ColumnModel): number;

	colspan(column: ColumnModel, row: any): number;

	value(row: any, column: ColumnModel, value: any): string;

	label(row: any, column: ColumnModel, value: any): string;

	valueFactory(column: ColumnModel, getValueFactory: IGetValueFactory): IGetResult;

	labelFactory(column: ColumnModel): IGetResult;
}
