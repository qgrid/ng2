import { CellEditor } from './edit.cell.editor';
import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { CellView } from '../scene/view/cell.view';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class EditCellLet {
	constructor(plugin: GridPlugin);

	readonly enter: Command<CellView>;
	readonly commit: Command<CellView>;
	readonly push: Command<CellView>;
	readonly cancel: Command<CellView>;
	readonly reset: Command<CellView>;
	readonly exit: Command<CellView>;

	value: any;
	label: any;

	readonly cell: CellView;
	readonly row: any;
	readonly column: ColumnModel;
	readonly editor: CellEditor;

	readonly fetch: any;
	readonly resetFetch: () => void;

	requestClose: () => boolean;
}
