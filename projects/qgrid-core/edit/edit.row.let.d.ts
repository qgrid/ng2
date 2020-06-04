import { RowEditor } from './edit.row.editor';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class EditRowLet {
	constructor(plugin: GridPlugin);

	readonly editor: RowEditor;

	readonly enter: Command<any>;
	readonly commit: Command<any>;
	readonly cancel: Command<any>;
	readonly reset: Command<any>;
}
