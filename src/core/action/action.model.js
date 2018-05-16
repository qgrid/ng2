import {Resource} from '../resource';
import {Shortcut, ShortcutDispatcher} from '../shortcut';
import {CommandManager} from '../command/command.manager';

export class ActionModel {
	constructor() {
		this.resource = new Resource();
		this.items = [];
		this.shortcut = new Shortcut(new ShortcutDispatcher());
		this.manager = new CommandManager();
	}
}