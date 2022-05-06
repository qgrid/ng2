import { Td } from '../dom/td';
import { CellView } from '../scene/view/cell.view';

export declare class CellEditor {
  value: any;
  label: any;

  readonly cell: CellView;

  fetch: () => void;
  resetFetch: () => void;

  constructor(td: Td);



  commit(): void;
  reset(): void;
}
