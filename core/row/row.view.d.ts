import {View} from '../view/view';
import {Command} from '../command/command';
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';

export declare class RowView extends View {
  constructor(model: Model, table: Table, tagName: string);

  drop: Command;
  drag: Command;
}
