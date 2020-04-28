import { Command } from '../command/command';
import { GridService } from '../services/grid';
import { ColumnModel } from '../column-type/column.model';
import { GridPlugin } from '../plugin/grid.plugin';

export class GroupView {
	constructor(plugin: GridPlugin, service: GridService, shortcut: { register: (commands: Command[]) => void });

	readonly toggleStatus: Command;
	readonly toggleAllStatus: Command;

	count(node: Node, column: ColumnModel): number;
	status(node: Node, column: ColumnModel): 'expand' | 'collapse';
	offset(node: Node, column: ColumnModel): number;
	value(node: Node, column: ColumnModel): string;
	isVisible(node: Node, column: ColumnModel): boolean;
}
