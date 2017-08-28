import {View} from '../view/view';
import {Command} from '../command/command';
import {CommandManager} from '../command/command.manager';
import {Model} from '../infrastructure/model';
import {Table} from '../dom/table';
import {GridService} from '../services/grid';

export declare type ExpandOrCollapse = 'expand' | 'collapse';

export class GroupView extends View {
  constructor(model: Model, table: Table, commandManager: CommandManager, service: GridService);

  toggleStatus: Command;

  count(node: Node): number;

  status(node: Node): ExpandOrCollapse;

  offset(node: Node): number;

  value(node: Node): string;
}