import { Command } from '../command/command';
import { CommandManager } from '../command/command.manager';
import { Model } from '../infrastructure/model';
import { Table } from '../dom/table';
import { GridService } from '../services/grid';
import { ColumnModel } from '../column-type/column.model';

/**
 * > Under Construction.
 */
export class GroupView {
	constructor(model: Model, table: Table, commandManager: CommandManager, service: GridService);

	toggleStatus: Command;
	toggleAllStatus: Command;

	count(node: Node, column: ColumnModel): number;
	status(node: Node, column: ColumnModel): 'expand' | 'collapse';
	offset(node: Node, column: ColumnModel): number;
	value(node: Node, column: ColumnModel): string;
	isVisible(node: Node, column: ColumnModel): boolean; 
}
