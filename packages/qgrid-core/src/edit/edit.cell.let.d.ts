import { ColumnModel } from '../column-type/column.model';
import { EditorOptions } from '../column-type/editor.options';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { CellView } from '../scene/view/cell.view';
import { KeyCode } from '../shortcut/key.code';
import { CellEditor } from './edit.cell.editor';

export declare class EditCellLet {
	readonly enter: Command;
	readonly commit: Command;
	readonly push: Command;
	readonly cancel: Command;
	readonly reset: Command;
	readonly exit: Command;

	value: any;
	label: any;
	requestClose: () => boolean;

	readonly cell: CellView;
	readonly row: any;
	readonly column: ColumnModel;
	readonly options: EditorOptions;
	readonly editor: CellEditor;

	readonly fetch: any;
	readonly resetFetch: () => void;

	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void, keyCode: () => KeyCode }
	);

}
