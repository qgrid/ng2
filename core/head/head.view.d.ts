import {View} from '../view/view';
import {Command} from '../command/command';
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';

/**
 * > Under Construction.
 */
export declare class HeadView extends View {
  constructor(model: Model, table: Table, tagName: string);

  rows: any[];
  drop: Command;
  drag: Command;
  resize: Command;
  
  get lastRow(): any;
}
