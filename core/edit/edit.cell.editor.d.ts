import { Fetch } from '../infrastructure/fetch';
import { CellView } from '../scene/view/cell.view';
import { ColumnModel } from '../column-type/column.model';
import { EditorOptions } from '../column-type/editor.options';

export declare class CellEditor {
	constructor(cell: CellView);

	fetch: () => void;
	resetFetch: () => void;
	commit(): void;
	reset(): void;

	readonly options: EditorOptions;
	
	cell: CellView;
	value: any;
	label: any;
	readonly title: string;
	readonly column: ColumnModel;

	getLabel(item: any): any;

	fetchFactory(): Fetch;

	static readonly empty: CellEditor;
}
