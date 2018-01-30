import {Resource} from '../resource';

export class ClipboardModel {
	constructor() {
		this.resource = new Resource();
		this.shortcut = {
			copy: 'ctrl+c'
		};
	}
}
