import { View } from '../view/view';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';

/**
 * > Under Construction.
 */
export declare class ScrollView extends View {
	constructor(model: Model, table: Table, vscroll: any);

	readonly mode: 'virtual' | 'default';

	invalidate(): void;
}
