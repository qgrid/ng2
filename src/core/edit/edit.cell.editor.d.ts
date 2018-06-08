import { Fetch } from '../infrastructure/fetch';
import { CellView } from '../scene/view/cell.view';
import { ColumnModel } from '../column-type/column.model';
import { EditorOptions } from '../column-type/editor.options';
import { Td } from '../dom/td';

export declare class CellEditor {
	constructor(td: Td);

	fetch: () => void;
	resetFetch: () => void;

	value: any;
	label: any;

	readonly cell: CellView;

	commit(): void;
	reset(): void;
}
