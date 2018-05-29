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

	render: Renderer;
	rows: any[];

	columns(row: any, pin: string): ColumnView[];
	rowspan(row: any, column: ColumnView): number;
	colspan(row: any, column: ColumnView): number;
	value(row: any, column: ColumnModel, value?: any): string;
	label(row: any, column: ColumnModel, value?: any): string;
}
