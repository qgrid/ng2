import { ColumnModel } from '../column-type/column.model';
import { Command } from '../command/command';
import { Td } from '../dom/td';
import { GridPlugin } from '../plugin/grid.plugin';
import { SubjectLike } from '../rx/rx';
import { SelectionState } from './selection.state';

export declare class SelectionLet {
  readonly selection: SelectionState;
  readonly rows: any[];
  readonly columns: ColumnModel[];

  readonly toggleRow: Command;
  readonly toggleCell: Command;
  readonly toggleColumn: Command;

  stateCheck: SubjectLike<boolean>;

  constructor(plugin: GridPlugin, shortcut: { register: (commands: Command[]) => void });

  selectRange(startCell: Td, endCell: Td, source?: string): void;

  state(item: any): boolean;
  isIndeterminate(item: any): boolean;
}
