import { GridPlugin } from '../plugin/grid.plugin';

export declare class BodyHost {
	constructor(plugin: GridPlugin);

	scroll(e: { scrollLeft: number, scrollTop: number });
	wheel(e: MouseWheelEvent);
	mouseDown(e: MouseEvent);
	mouseMove(e: MouseEvent);
	mouseLeave(e: MouseEvent);
	mouseUp(e: MouseEvent);
}
