import {CellEditor} from './edit.cell.editor';
import {ColumnModel} from '../column-type/column.model';


export declare class RowEditorCore {
	constructor();

	editors: CellEditor[];

	commit(): void;
	reset(): void;
}

export declare class CellView {
	constructor(row: any, column: ColumnModel);

	row: any;
	column: ColumnModel;
	value: any;
	label: any;
}

export declare const empty: RowEditorCore;

export declare class RowEditor extends RowEditorCore {
	constructor(row: any, columns: ColumnModel[]);

	static readonly empty: RowEditorCore;

	row: any;
	value: any;

	commit(): void;
	reset(): void;
}
