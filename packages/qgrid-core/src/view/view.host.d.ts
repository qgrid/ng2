import { GridPlugin } from '../plugin/grid.plugin';

export declare class ViewHost {
	constructor(plugin: GridPlugin);

	invalidate(): void;

	mouseDown(e: MouseEvent): void;
	mouseUp(e: MouseEvent): void;

	mouseMove(e: MouseEvent): void;

	mouseEnter(e: MouseEvent): void;
	mouseLeave(e: MouseEvent): void;
}
