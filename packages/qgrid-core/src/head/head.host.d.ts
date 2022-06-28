import { GridPlugin } from '../plugin/grid.plugin';

export declare class HeadHost {
  constructor(plugin: GridPlugin);

  mouseMove(e: MouseEvent): void;
  mouseLeave(e: MouseEvent): void;
}
