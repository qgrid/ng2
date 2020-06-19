import { Resource } from '../resource/resource';
import { Shortcut } from './shortcut';
import { CommandManager } from '../command/command.manager';

export class ShortcutState {
	constructor() {
		this.root = new Shortcut(new CommandManager());
	}
}
