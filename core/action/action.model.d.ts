import { Action } from './action';
import { Shortcut } from '../shortcut/shortcut';
import { CommandManager } from '../command/command.manager';
import { Resource } from '../resource/resource';

/**
 * A class to handle and visualize custom user behaviors(like add or delete row).
 * 
 * Action bar plugin uses this model to draw buttons to execute commands.
 */
export declare class ActionModel {
  constructor();

  resource: Resource;

  /**
   * List of actions that will be added to the command manager.
   */
  items: Action[];

  /**
   * This service connects keydown events with commands.
   */
  shortcut: Shortcut;

  /**
   * Command manager is responsible for the next questions:
   * * What commands can be executed.
   * * How(e.g. in which order) commands should be executed.
   */
  manager: CommandManager
}
