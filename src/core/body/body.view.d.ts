import { ColumnModel } from '../column-type/column.model';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { ColumnView } from '../scene/view/column.view';
import { Renderer } from '../scene/render/render';

/**
 * > Under Construction.
 */
export declare class BodyView {
	constructor(model: Model, table: Table);

	readonly rows: any[];

	render: Renderer;

	columns(pin: string): ColumnView[];
}
