import {CellEditor} from './edit.cell.editor';
import {ColumnModel} from "../column-type/column.model";


export declare class RowEditorCore {
	constructor();

	editors: CellEditor[];

	commit(): void;

	reset(): void
}

export declare class CellView {
	constructor(public row: any, public column: ColumnModel);

	readonly value: any;

	set value(value: any);

	readonly label: any;

	set label(value: any);
}

export declare const empty: RowEditorCore;

export declare class RowEditor extends RowEditorCore {
	constructor(public row: any, columns: ColumnModel[]);

	value: any;

	commit(): void;

	reset(): void;

	static readonly empty: RowEditorCore;
}