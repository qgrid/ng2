import { View } from '../view/view';
import { Command } from '../command/command';
import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

/**
 * > Under Construction.
 */
export declare class NavigationView extends View {
	constructor(model: Model, table: Table, commandManager: CommandManager);

	focus: Command;
	scrollTo: Command;
}
