import {Resource} from '../resource';
import {Command} from '../command';

export class EditModel {
	constructor() {
		this.resource = new Resource();
		this.mode = null; // cell | row
		this.state = 'view'; // view | edit
		this.enter = new Command();
		this.commit = new Command();
		this.cancel = new Command();
		this.reset = new Command();

		this.enterShortcuts = {
			'$default': '*'
		};

		this.commitShortcuts = {
			'$default': 'tab|shift+tab|enter',
			'date': 'ctrl+s',
			'array': 'ctrl+s',
			'reference': 'ctrl+s',
			'email': 'ctrl+s',
			'file': 'ctrl+s',
			'image': 'ctrl+s'
		};
	}
}