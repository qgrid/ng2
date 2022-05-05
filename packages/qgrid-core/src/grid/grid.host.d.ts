import { GridPlugin } from '../plugin/grid.plugin';

export declare class GridHost {
  constructor(
		element: HTMLElement,
		plugin: GridPlugin
	);

  keyDown(e: any, source?: string): string[];
  keyUp(e: any, source?: string): string[];
  invalidateActive(): void;
}
