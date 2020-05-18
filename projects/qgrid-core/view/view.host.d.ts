import { GridService } from '../grid/grid.service';
import { GridPlugin } from '../plugin/grid.plugin';

export declare class ViewHost {
	constructor(plugin: GridPlugin, service: GridService);

	invalidate(): void;

	mouseDown(e: MouseEvent);
	mouseMove(e: MouseEvent);
	mouseLeave(e: MouseEvent);
	mouseUp(e: MouseEvent);
}
