import Resource from 'core/resource/resource';
import {identity} from 'core/services/utility';

export default class SelectionModel {
	constructor() {
		this.resource = new Resource();
		this.unit = 'cell';//row|cell|column|mix
		this.mode = 'single';//single|multiple|range
		this.entries = [];
		this.items = [];
		this.key = {
			row: identity,
			column: identity
		};
	}
}