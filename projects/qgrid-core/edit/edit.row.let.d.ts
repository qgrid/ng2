import { RowEditor } from './edit.row.editor';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class EditRowLet {
	constructor(
		plugin: GridPlugin,
		shortcut: { register: (commands: Command[]) => void }
	);

	readonly editor: RowEditor;
	readonly enter: Command;
	readonly commit: Command;
	readonly cancel: Command;
	readonly reset: Command;
}
