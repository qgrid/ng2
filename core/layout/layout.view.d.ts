import {View} from '../view/view';
import {ColumnModel} from "../column-type/column.model";
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';
import {GridService} from '../services/grid';

export declare class LayoutView extends View {
  constructor(model: Model, table: Table, gridService: GridService);

  onInit(): void;

  readonly form: ColumnModel;

  invalidateColumns(form: object): void;

  destroy(): void;

  readonly styleId: string;
}
