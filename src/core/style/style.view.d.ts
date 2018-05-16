import { View } from '../view/view';
import { Monitor } from './style.monitor';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

/**
 * > Under Construction.
 */
export declare class StyleView extends View {
	constructor(model: Model, table: Table);

	monitor: {
		row: Monitor;
		cell: Monitor;
	};

	invalidate(domRow: any, domCell: any): void;
	needInvalidate(): boolean;
}
