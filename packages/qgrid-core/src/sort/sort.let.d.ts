import { Command } from '../command/command';
import { ColumnModel } from '../column-type/column.model';
import { Model } from '../model/model';
import { GridPlugin } from '../plugin/grid.plugin';


export declare class SortLet {
	constructor(plugin: GridPlugin);

	readonly hover: boolean;
	readonly toggle: Command;

	direction(column: ColumnModel): { [key: string]: ColumnModel };
	order(column: ColumnModel): number;
}
