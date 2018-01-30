import {Resource} from '../resource';
import {identity} from '../utility';
import {Command} from '../command';

export class ClipboardModel {
	constructor() {
		this.resource = new Resource();
		this.shortcut = {
			copy: 'ctrl+c'
		};
	}
}
