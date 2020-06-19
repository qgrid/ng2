import { CellView } from '../scene/view/cell.view';
import { GridPlugin } from '../plugin/grid.plugin';
import { NavigationSite } from './navigation.site';

export declare class Navigation {
	constructor(
		plugin: GridPlugin,
		site: NavigationSite
	);

	isActive(): boolean;
	cell(rowIndex: number, columnIndex: number): CellView | null;
	position(y: number, dir: 'up' | 'down')
}
