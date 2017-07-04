import {Shortcut} from '../infrastructure/shortcut';
import {RowEditor} from './edit.row.editor';
import {Model} from "../infrastructure/model";
import {Table} from "../dom/table";
import {CommandManager} from "../infrastructure/command.manager";
import {IShortcutOff} from "./edit.cell.view";
import {Command} from "../infrastructure/command";

export interface IContextFactory{
	row: any,
	current: any,
	unit: string
}

export declare class EditRowView {
	constructor(public model: Model, public table: Table, commandManager: CommandManager);

	editor: RowEditor;
	shortcut: Shortcut;
	commands: Map;
	shortcutOff: IShortcutOff;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;

	readonly commands: Map;

	contextFactory(row: any): IContextFactory;

	commitShortcut(): string;

	destroy(): void;
}
