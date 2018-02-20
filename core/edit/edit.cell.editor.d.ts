import { Fetch } from '../infrastructure/fetch';
import { CellView } from '../scene/view/cell.view';
import { ColumnModel, IEditorOptions } from '../column-type/column.model';

export declare class CellEditor {
	constructor(cell: CellView);

	fetch: () => void;
	resetFetch: () => void;
	commit(): void;
	reset(): void;

	readonly options: IEditorOptions;
	
	cell: CellView;
	value: any;
	label: any;
	readonly title: string;
	readonly column: ColumnModel;

	getLabel(item: any): any;

	fetchFactory(): Fetch;

	static readonly empty: CellEditorCore;
}
