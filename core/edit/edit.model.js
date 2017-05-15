import {Resource} from '../resource';
import {Command} from '../infrastructure';

export class EditModel {
	constructor() {
		this.resource = new Resource();
		this.mode = null; // cell | row
		this.state = 'view'; // view | edit
		this.enter = new Command();
		this.commit = new Command();
		this.cancel = new Command();
		this.reset = new Command();
		this.commitShortcuts = {
			'$default': 'tab|shift+tab|enter',
			'text': 'enter',
			'password': 'ctrl+s',
			'number': 'ctrl+s',
			'date': 'ctrl+s',
			'array': 'ctrl+s'
		};
	}
}