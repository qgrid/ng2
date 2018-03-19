import { Fetch } from '../infrastructure/fetch';
import { CellView } from '../scene/view/cell.view';
import { ColumnModel } from '../column-type/column.model';
import { EditorOptions } from '../column-type/editor.options';

export declare class CellEditor {
	constructor(cell: CellView);

	static readonly empty: CellEditor;

	fetch: () => void;
	resetFetch: () => void;
	cell: CellView;
	value: any;
	label: any;

	readonly options: EditorOptions;
	readonly title: string;
	readonly column: ColumnModel;

	getLabel(item: any): any;
	fetchFactory(): Fetch;
	commit(): void;
	reset(): void;
}
