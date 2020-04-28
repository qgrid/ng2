import { Monitor } from './style.monitor';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class StyleView {
	constructor(plugin: GridPlugin);

	readonly monitor: {
		row: Monitor;
		cell: Monitor;
	};

	invalidate(domRow: any, domCell: any): void;
	needInvalidate(): boolean;
}
