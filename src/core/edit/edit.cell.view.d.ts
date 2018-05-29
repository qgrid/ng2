import { CellEditor } from './edit.cell.editor';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { Table } from '../dom/table';
import { Model } from '../infrastructure/model';
import { EditorOptions } from '../column-type/editor.options';
import { KeyCode } from '../shortcut/key.code';

/**
 * > Under Construction.
 */
export declare class EditCellView {
	constructor(model: Model, table: Table, shortcut: { register: (commands: Command[]) => void, keyCode: () => KeyCode });

	editor: CellEditor;
	enter: Command;
	commit: Command;
	push: Command;
	cancel: Command;
	reset: Command;
	exit: Command;
	value: any;
	label: any;
	column: ColumnModel;

	readonly fetch: () => void;
	readonly options: EditorOptions;
}
