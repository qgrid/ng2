import { StyleMonitor } from './style.monitor';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class StyleLet {
	constructor(plugin: GridPlugin);

	readonly monitor: {
		row: StyleMonitor;
		cell: StyleMonitor;
	};

	invalidate(domRow: any, domCell: any): void;
	needInvalidate(): boolean;
}
