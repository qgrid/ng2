import { Model } from '../infrastructure/model';
import { Defer } from '../infrastructure/defer';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';

/**
 * > Under Construction.
 */
export declare class ScrollView {
	constructor(model: Model, table: Table, vscroll: any, gridService: GridService);

	readonly mode: 'virtual' | 'default';
	readonly y: any;

	invalidate(): void;
}
