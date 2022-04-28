import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export class GroupLet {
	readonly toggleStatus: Command<[any, ColumnModel]>;
	readonly toggleAllStatus: Command;

	constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });


	count(node: Node, column: ColumnModel): number;
	status(node: Node, column: ColumnModel): 'expand' | 'collapse';
	offset(node: Node, column: ColumnModel): number;
	value(node: Node, column: ColumnModel): string;
	isVisible(node: Node, column: ColumnModel): boolean;
}
