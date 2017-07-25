export interface IContext {
  execute: () => void;
  canExecute: () => boolean;
}

export declare class Command {
  constructor(context: IContext);
}
