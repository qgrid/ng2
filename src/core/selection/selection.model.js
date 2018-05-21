import { Resource } from '../resource/resource';
import { identity } from '../utility/kit';
import { Command } from '../command/command';

export class SelectionModel {
	constructor() {
		this.resource = new Resource();
		this.unit = 'cell';//row|cell|column|mix
		this.mode = 'single';//single|multiple|range
		this.items = [];
		this.area = 'body'; //body, custom
		this.toggle = new Command({ source: 'selection.model' });
		this.key = {
			row: identity,
			column: identity
		};
		this.shortcut = {
			toggleRow: 'shift+space',
			togglePreviousRow: 'shift+up',
			toggleNextRow: 'shift+down',
			toggleColumn: 'ctrl+space',
			toggleNextColumn: 'shift+right',
			togglePreviousColumn: 'shift+left',
			selectAll: 'ctrl+a'
		};
	}
}
