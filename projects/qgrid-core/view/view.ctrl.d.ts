import { GridService } from '../services/grid';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ViewCtrl {
	constructor(plugin: GridPlugin, service: GridService);

	invalidate(): void;
}
