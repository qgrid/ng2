import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';


export declare class SortLet {
  readonly hover: boolean;
  readonly toggle: Command<ColumnModel>;

  constructor(plugin: GridPlugin);

  direction(column: ColumnModel): { [key: string]: ColumnModel };
  order(column: ColumnModel): number;
}
