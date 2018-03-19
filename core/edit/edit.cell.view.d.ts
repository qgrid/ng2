import { CellEditor } from './edit.cell.editor';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { Table } from '../dom/table';
import { Model } from '../infrastructure/model';
import { View } from '../view/view';
import { EditorOptions } from '../column-type/editor.options';

/**
 * > Under Construction.
 */
export declare class EditCellView extends View {
	constructor(model: Model, table: Table, commandManager: CommandManager);

	editor: CellEditor;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;
	exit: Command;
	value: any;
	label: any;
	column: ColumnModel;

	readonly fetch: () => void;
	readonly options: EditorOptions;
}
