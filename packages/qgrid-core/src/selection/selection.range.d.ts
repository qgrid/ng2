import { ColumnModel } from '../column-type/column.model';
import { Td } from '../dom/td';
import { Model } from '../model/model';

export declare class SelectionRange {
  model: Model;

  constructor(model: Model);

  build(): (args: any[]) => (startCell: Td, endCell: Td) => any;
  buildRows(startCell: Td, endCell: Td): any[];
  buildColumns(startCell: Td, endCell: Td): ColumnModel[];
  buildCells(startCell: Td, endCell: Td): Array<{ column: ColumnModel; row: any }>;
  buildMix(startCell: Td, endCell: Td): any[];
}
