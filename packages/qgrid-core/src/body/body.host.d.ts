import { GridPlugin } from '../plugin/grid.plugin';

export declare class BodyHost {
  constructor(plugin: GridPlugin);

  scroll(e: { scrollLeft: number; scrollTop: number }): void;
  wheel(e: WheelEvent): void;

  mouseLeave(e: MouseEvent): void;
}
