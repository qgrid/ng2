import {View} from '../view/view';
import {Command} from '../command/command';
import {CommandManager} from '../command/command.manager';
import {Model} from '../infrastructure/model';

export declare type ExpandOrCollapse = 'expand' | 'collapse';

export class GroupView extends View {
  constructor(model: Model, commandManager: CommandManager);

  toggleStatus: Command;

  count(node: Node): number;

  status(node: Node): ExpandOrCollapse;

  offset(node: Node): number;

  value(node: Node): string;
}
