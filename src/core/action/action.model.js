import { Resource } from '../resource/resource';
import { Shortcut } from '../shortcut/shortcut';
import { ShortcutDispatcher } from '../shortcut/shortcut.dispatcher';
import { CommandManager } from '../command/command.manager';

export class ActionModel {
	constructor() {
		this.resource = new Resource();
		this.items = [];
		this.shortcut = new Shortcut(new ShortcutDispatcher());
		this.manager = new CommandManager();
	}
}