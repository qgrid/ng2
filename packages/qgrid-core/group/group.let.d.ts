import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { GridPlugin } from '../plugin/grid.plugin';

export class GroupLet {
	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

	readonly toggleStatus: Command<[any, ColumnModel]>;
	readonly toggleAllStatus: Command;

	count(node: Node, column: ColumnModel): number;
	status(node: Node, column: ColumnModel): 'expand' | 'collapse';
	offset(node: Node, column: ColumnModel): number;
	value(node: Node, column: ColumnModel): string;
	isVisible(node: Node, column: ColumnModel): boolean;
}
