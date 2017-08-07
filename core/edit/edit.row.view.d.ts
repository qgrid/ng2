import {Shortcut} from '../infrastructure/shortcut';
import {RowEditor} from './edit.row.editor';
import {CommandManager} from '../infrastructure/command.manager';
import {IShortcutOff} from './edit.cell.view';
import {Command} from '../infrastructure/command';

export interface IContextFactory{
	row: any,
	current: any,
	unit: string
}

export declare class EditRowView {
	constructor(commandManager: CommandManager);
	editor: RowEditor;
	shortcut: Shortcut;
	shortcutOff: IShortcutOff;
	enter: Command;
	commit: Command;
	cancel: Command;
	reset: Command;
	readonly commands: Map<any, any>;
	contextFactory(row: any): IContextFactory;
	commitShortcut(): string;
	destroy(): void;
}
