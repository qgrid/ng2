import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';

export class FilterLet {
	constructor(plugin: GridPlugin);

	readonly filter: Command<any>;
	has(column: ColumnModel): boolean;
	value<T>(column: ColumnModel): T;
}
