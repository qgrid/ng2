import { Shortcut } from '../shortcut/shortcut';
import { Command } from './command';
import { CommandKey } from './command.key';
import { Model } from '../model/model';

export class CommandPalette {
  constructor(model: Model, shortcut: Shortcut);

  register(command: Command<any>): void;

  unregister(command: Command<any>): void;

  get<T>(key: CommandKey<T>): Command<T>;

  find<T>(key: CommandKey<T>): Command<T> | null;
}
