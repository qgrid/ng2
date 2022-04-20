import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { RowEditor } from './edit.row.editor';

export declare class EditRowLet {
	readonly editor: RowEditor;
	readonly enter: Command;
	readonly commit: Command;
	readonly cancel: Command;
	readonly reset: Command;

	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);
}
