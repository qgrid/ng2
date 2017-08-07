import {Resource} from '../resource';
import {identity} from '../utility';
import {Command} from '../command';

export class SelectionModel {
	constructor() {
		this.resource = new Resource();
		this.unit = 'cell';//row|cell|column|mix
		this.mode = 'single';//single|multiple|range
		this.items = [];
		this.area = 'body'; //body, custom
		this.toggle = new Command();
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