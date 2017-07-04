import {View} from '../view/view';
import {Command} from '../infrastructure/command';
import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";
import {ColumnModel} from "../column-type/column.model";

export interface ITransferReturnObj{
	key: string;
	value: string;
}

export declare class HeadView extends View {
	constructor(model: Model, public table: Table, public tagName: string);

	rows: any[];
	drop: Command;
	drag: Command;
	resize: Command;

	transfer(column: ColumnModel): ITransferReturnObj;

	invalidate(model: Model): void;
}