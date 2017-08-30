import {View} from '../view/view';
import {SingleOrMultipleMode} from '../row/row.model';
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';
import {GridService} from '../services/grid';

export declare class ScrollView extends View {
  constructor(model: Model, table: Table, vscroll: any, gridService: GridService);

  invalidate(): void;

  readonly mode: SingleOrMultipleMode;
}
