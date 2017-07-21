import {Shortcut} from '../infrastructure/shortcut';

export interface IContext{
  execute(param: object): any;
  canExecute(param: object): boolean;
  shortcut: Shortcut;
}

export declare class Command {
  constructor(context: IContext);
}
