import { GridPlugin } from '../plugin/grid.plugin';

export declare class PaginationView {
	constructor(plugin: GridPlugin);

	readonly current: number;
	readonly size: number;
}
