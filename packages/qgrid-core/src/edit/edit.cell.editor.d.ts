import { CellView } from '../scene/view/cell.view';
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
