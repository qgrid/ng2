import { View } from '../view/view';
import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';

/**
 * > Under Construction.
 */
export declare class LayoutView extends View {
	constructor(model: Model, table: Table, gridService: GridService);

	readonly styleId: string;
	readonly form: ColumnModel;

	onInit(): void;
	invalidateColumns(form: object): void;
	destroy(): void;
}
