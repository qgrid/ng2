import {Resource} from '../resource';
import {identity} from '../utility';
import {Command} from '../command';

export class ClipboardModel {
	constructor() {
		this.resource = new Resource();
		this.unit = 'cell';//row|cell|column|mix
		this.mode = 'single';//single|multiple|range
		this.items = [];
		this.area = 'body'; //body, custom
		this.toggle = new Command({source: 'clipboard.model'});
		this.shortcut = {
			copy: 'ctrl+c'
		};
	}
}
