import { RowEditor } from './edit.row.editor';
import { CommandManager } from '../command/command.manager';
import { Command } from '../command/command';
import { Table } from '../dom/table';

export declare class EditRowView {
	constructor(model: any, table: Table, shortcut: { register: (commands: Command[]) => void });

	editor: RowEditor;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;
}
