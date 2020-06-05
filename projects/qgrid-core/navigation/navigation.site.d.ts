import { GridPlugin } from '../plugin/grid.plugin';

export declare class NavigationSite {
	constructor(plugin: GridPlugin);

	currentColumn(): number;
	nextColumn(): number;
	prevColumn(): number;
	lastColumn(): number;
	firstColumn(): number;
	currentRow(): number;
	nextRow(): number;
	prevRow(): number;
	firstRow(): number;
	lastRow(): number;
}
