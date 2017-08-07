import {Resource} from '../resource';
import {Command} from '../command';

export class GroupModel {
	constructor() {
		this.resource = new Resource();
		this.by = [];
		this.shortcut = {
			toggle: 'space'
		};
		this.toggle = new Command();
	}
}