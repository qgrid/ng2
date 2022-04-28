import { GridPlugin } from '../plugin/grid.plugin';
import { SubscribableLike } from '../rx/rx';
import { ScrollStateMode } from './scroll.state';

export declare interface IVscrollSettings {
	threshold: number;
	placeholderHeight: number;
	placeholderWidth: number;
	resetTriggers: Array<string>;
	rowHeight: number | ((element: HTMLElement) => number);
	columnWidth: number | ((element: HTMLElement) => number);

	fetch: (skip: number, take: number, d: { resolve: (count: number) => void; reject: () => void }) => void;
	emit: (f: () => void) => void;
}

export declare interface IVscrollContainer {
	count: number;
	position: number;
	force: boolean;

	draw$: SubscribableLike<{ position: number }>;

	reset(): void;
	update(count: number): void;
}

export declare interface IVscrollContext {
	settings: IVscrollSettings;
	container: IVscrollContainer;

	id(index: number): number;
}

export declare class ScrollLet {
	readonly mode: ScrollStateMode;
	readonly y: IVscrollContext;

	constructor(plugin: GridPlugin, vscroll: IVscrollContext);
}
