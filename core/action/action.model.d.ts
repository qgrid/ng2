import {Action} from './action';
import { Shortcut } from '../shortcut/shortcut';
import { CommandManager } from '../command/command.manager';

export declare class ActionModel {
  constructor();
  
  items: Action[];
  shortcut: Shortcut;
  manager: CommandManager
}
