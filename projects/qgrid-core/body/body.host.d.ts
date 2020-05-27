import { GridPlugin } from '../plugin/grid.plugin';

export declare class BodyHost {
	constructor(plugin: GridPlugin);

	scroll(e: { scrollLeft: number, scrollTop: number });
	wheel(e: MouseWheelEvent);

	mouseLeave(e: MouseEvent);
}
