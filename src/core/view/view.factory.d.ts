import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';

export declare function viewFactory(
	model: Model,
	table: Table,
	commandManager: CommandManager,
	gridService: any,
	vscroll: any,
	selectors: any
): (host: any) => () => void;
