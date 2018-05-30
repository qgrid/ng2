import { Resource } from '../resource/resource';
import { Command } from '../command/command';

export class GroupModel {
	constructor() {
		this.resource = new Resource();
		this.mode = 'column'; // default | subhead | rowspan
		this.by = [];
		this.shortcut = {
			toggle: 'space'
		};
		this.toggle = new Command({ source: 'group.model' });
		this.toggleAll = new Command({ source: 'group.model' });
	}
}