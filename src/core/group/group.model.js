import { Resource } from '../resource/resource';
import { Command } from '../command/command';
import { flattenFactory } from '../node/node.service';

export class GroupModel {
	constructor() {
		this.resource = new Resource();
		this.mode = 'nest'; // nest | flat | subhead | rowspan
		this.summary = null; // null | leaf
		this.by = [];
		this.shortcut = {
			toggle: 'space'
		};
		this.toggle = new Command({ source: 'group.model' });
		this.toggleAll = new Command({ source: 'group.model' });

		this.flattenFactory = flattenFactory;
	}
}