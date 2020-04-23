import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { Disposable } from '../infrastructure/disposable';

export declare function viewFactory(
	model: Model,
	table: Table,
	commandManager: CommandManager,
	gridService: any,
	vscroll: any,
	selectors: any,
	disposable: Disposable
): (host: any) => () => void;
