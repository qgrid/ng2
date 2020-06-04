import { Resource } from '../resource/resource';
import { Command } from '../command/command';

export class EditState {
	constructor() {
		this.resource = new Resource();

		this.mode = null; // cell | row
		this.status = 'view'; // view | edit | startBatch | endBatch
		this.method = null; // batch

		this.enter = new Command();
		this.commit = new Command();
		this.cancel = new Command();
		this.reset = new Command();
		this.clear = new Command();

		this.cancelShortcuts = {
			'$default': 'escape'
		};

		this.enterShortcuts = {
			'$default': '*',
			'row': 'F2|Enter',
			'form': 'F2|Enter'
		};

		this.commitShortcuts = {
			'$default': 'tab|shift+tab|enter|ctrl+s',
			'reference': 'ctrl+s',
			'row': 'ctrl+s',
			'form': 'ctrl+s',
			'bool': 'tab|shift+tab|left|right|up|down|home|end|pageUp|pageDown',
			'text-area': 'ctrl+s|ctrl+enter'
		};
	}
}
