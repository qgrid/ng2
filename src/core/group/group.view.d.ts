import { Command } from '../command/command';
import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';

/**
 * > Under Construction.
 */
export class GroupView {
	constructor(model: Model, table: Table, commandManager: CommandManager, service: GridService);

	toggleStatus: Command;
	toggleAllStatus: Command;

	count(node: Node): number;
	status(node: Node): 'expand' | 'collapse';
	offset(node: Node): number;
	value(node: Node): string;
}
