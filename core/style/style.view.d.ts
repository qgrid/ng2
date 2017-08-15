import {View} from '../view/view';
import {Monitor} from './style.monitor';
import {IValueFactory} from '../services/value';
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';

export interface IActive{
	row: boolean;
	cell: boolean;
}

export interface IMonitor{
	row: Monitor;
	cell: Monitor;
}

export declare class StyleView extends View {
	constructor(model: Model, table: Table);

	valueFactory: IValueFactory;
	active: IActive;
	monitor: IMonitor;
	invalidate(): void;
}
