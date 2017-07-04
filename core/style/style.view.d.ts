import {View} from '../view/view';
import {Monitor} from './style.monitor';
import {IValueFactory} from '../services/value';
import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";

export interface IActiveObj{
	row: boolean;
	cell: boolean;
}

export interface IMonitorObj{
	row: Monitor;
	cell: Monitor;
}

export declare class StyleView extends View {
	constructor(model: Model, public table: Table);

	valueFactory: IValueFactory;
	active: IActiveObj;
	monitor: IMonitorObj;

	invalidate(): void;
}