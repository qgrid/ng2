import { Td } from './td';
import { Tr } from './tr';

export declare class Bag {
  findModel(element: HTMLElement): Tr | Td;
  hasModel(element: HTMLElement): boolean;

  addRow(row: Tr): void;
  addCell(cell: Td): void;
  deleteRow(row: Tr): void;
  deleteCell(cell: Td): void;
}
