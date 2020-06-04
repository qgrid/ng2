import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class SortLet {
	constructor(plugin: GridPlugin);

	readonly toggle: Command<ColumnModel>;

	direction(column: ColumnModel): { [key: string]: ColumnModel };
	order(column: ColumnModel): number;
}
