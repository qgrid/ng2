import { RowEditor } from './edit.row.editor';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';
import { Table } from '../dom/table';

/**
 * > Under Construction.
 */
export declare class EditRowView {
	constructor(model: any, table: Table, commandManager: CommandManager);

	editor: RowEditor;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;

	destroy(): void;
}
