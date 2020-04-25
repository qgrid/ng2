import { Monitor } from './style.monitor';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';


export declare class StyleView {
	constructor(model: Model, table: Table);

	monitor: {
		row: Monitor;
		cell: Monitor;
	};

	invalidate(domRow: any, domCell: any): void;
	needInvalidate(): boolean;
}
