import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';

/**
 * > Under Construction.
 */
export declare class ScrollView {
	constructor(model: Model, table: Table, vscroll: any);

	readonly mode: 'virtual' | 'default';
	readonly y: {
		container: {
			position: number;
		},
		settings: {

		}
	}

	invalidate(): void;
}
