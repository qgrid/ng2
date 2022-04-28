import { GridPlugin } from '../plugin/grid.plugin';
import { StyleMonitor } from './style.monitor';

export declare class StyleLet {
	readonly monitor: {
		row: StyleMonitor;
		cell: StyleMonitor;
	};

	constructor(plugin: GridPlugin);

	invalidate(domRow: any, domCell: any): void;
	needInvalidate(): boolean;
}
