import { CommandManager } from '../command/command.manager';
import { Resource } from '../resource/resource';
import { Shortcut } from '../shortcut/shortcut';
import { ShortcutDispatcher } from '../shortcut/shortcut.dispatcher';
import { noop } from '../utility/kit';

export class ActionState {
	constructor() {
		this.resource = new Resource();

		this.items = [
			{
				command: {
					execute: noop,
					priority: 0
				},
				title: 'Column chooser',
				icon: 'more_vert',
				templateUrl: 'plugin-column-chooser-trigger.tpl.html',
			}
		];

		this.shortcut = new Shortcut(new ShortcutDispatcher());
		this.manager = new CommandManager();
	}
}
