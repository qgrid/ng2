import { GridPlugin } from '../plugin/grid.plugin';

export declare class PaginationLet {
	constructor(plugin: GridPlugin);

	readonly current: number;
	readonly size: number;
}
