import { CellEditor } from './edit.cell.editor';
import { ColumnModel } from '../column-type/column.model';

export declare class RowEditorCore {
	constructor();

	editors: CellEditor[];

	commit(): void;
	reset(): void;
}

export declare class RowEditor extends RowEditorCore {
	constructor(row: any, columns: ColumnModel[]);

	static readonly empty: RowEditorCore;

	row: any;
	value: any;
}
