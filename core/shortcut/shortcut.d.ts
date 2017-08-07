import {Keyboard} from '../io';
import {CommandManager} from '../command/command.manager';
import {ShortcutManager} from './shortcut.manager';

export interface IKeyCode {
  code: string;
  key: string;
}

export declare class Shortcut {
  constructor(manager: ShortcutManager);

  static isControl(keyCode: IKeyCode): boolean;
  static isPrintable(keyCode: IKeyCode): boolean;
  static stringify(keyCode: IKeyCode): string;
  static translate(e: Event): string;
  factory(commandManager: CommandManager): object;
  keyDown(e: Event): boolean;
  register(commandManager: CommandManager, commands: any[]);
}
