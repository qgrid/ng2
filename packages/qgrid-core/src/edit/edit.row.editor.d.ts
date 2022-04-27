import { ColumnModel } from '../column-type/column.model';
import { CellEditor } from './edit.cell.editor';

export declare class RowEditorCore {
	editors: CellEditor[];

	constructor();

	commit(): void;
	reset(): void;
}

export declare class RowEditor extends RowEditorCore {
	static readonly empty: RowEditorCore;

	row: any;
	value: any;

	constructor(row: any, columns: ColumnModel[]);
}
