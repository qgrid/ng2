import {Fetch} from '../infrastructure/fetch';
import {INoopResult} from '../utility/utility';
import {CellView} from '../scene/view/cell.view';
import {ColumnModel, IEditorOptions} from '../column-type/column.model';

export declare class CellEditorCore {
	constructor();

	value: any;
	fetch: INoopResult;
	resetFetch: INoopResult;

	commit(): void;

	reset(): void;

	readonly options: IEditorOptions;
}

export declare class CellEditor extends CellEditorCore {
	constructor(cell: CellView);

	cell: CellView;
	value: any;
	label: any;
	readonly title: string;
	readonly column: ColumnModel;

	getLabel(item: any): any;

	fetchFactory(): Fetch;

	static readonly empty: CellEditorCore;
}
