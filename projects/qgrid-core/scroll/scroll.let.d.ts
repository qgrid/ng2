import { Defer } from '../infrastructure/defer';
import { GridPlugin } from '../plugin/grid.plugin';
import { ScrollStateMode } from './scroll.state';

export declare class VscrollContext {
	settings: {
		threshold?: number;
		resetTriggers?: Array<string>;
		rowHeight?: number | ((element: HTMLElement) => number);
		columnWidth?: number | ((element: HTMLElement) => number);

		fetch?: (skip: number, take: number, d: Defer) => void;
		emit?: (f: () => void) => void;
	};

	container: {
		count: number;
		total: number;
		position: number;
		cursor: number;
		items: any[];
		force: boolean;

		reset(): void;
		update(count: number): void;
	};

	id: (index: number) => number;
}

export declare class ScrollLet {
	constructor(plugin: GridPlugin, vscroll: VscrollContext);

	readonly mode: ScrollStateMode;
	readonly y: VscrollContext;
}
