import { CellEditor } from './edit.cell.editor';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { Table } from '../dom/table';
import { Model } from '../infrastructure/model';
import { EditorOptions } from '../column-type/editor.options';
import { KeyCode } from '../shortcut/key.code';
import { CellView } from '../scene/view/cell.view';

export declare class EditCellView {
	constructor(model: Model, table: Table, shortcut: { register: (commands: Command[]) => void, keyCode: () => KeyCode });
	
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
}
