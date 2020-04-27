import { GridPlugin } from '../plugin/grid.plugin';

export declare class BodyCtrl {
	constructor(plugin: GridPlugin);

	onScroll(e: any);
	onWheel(e: any);
	onMouseDown(e: MouseEvent);
	onMouseMove(e: MouseEvent);
	onMouseLeave(e: MouseEvent);
	onMouseUp(e: MouseEvent);
}
