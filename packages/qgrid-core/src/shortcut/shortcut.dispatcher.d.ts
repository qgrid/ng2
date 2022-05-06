import { Command } from '../command/command';
import { CommandManager } from '../command/command.manager';

export declare class ShortcutDispatcher {
  constructor();

  register(manager: CommandManager, commands: Command[]): () => void;
  execute(code: string): Command[];
  canExecute(code: string): boolean;
}
