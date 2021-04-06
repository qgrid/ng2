import { GridPlugin } from '../plugin/grid.plugin';

export declare class ViewHost {
	constructor(plugin: GridPlugin);

	invalidate(): void;

	mouseDown(e: MouseEvent);
	mouseUp(e: MouseEvent);

	mouseMove(e: MouseEvent);

	mouseEnter(e: MouseEvent);
	mouseLeave(e: MouseEvent);
}
