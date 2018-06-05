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
	getValue(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): any;
	setValue(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;
	getLabel(row: any, column: ColumnModel, rowIndex: number, columnIndex: number): string;
	estLabel(row: any, column: ColumnModel, value: any, rowIndex: number, columnIndex: number): void;
}
