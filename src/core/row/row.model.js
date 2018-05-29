import { Resource } from '../resource/resource';

export class RowModel {
	constructor() {
		this.resource = new Resource();

		this.mode = 'single'; // single | multiple | all
		this.unit = 'data'; // data | details
		this.height = element => element && element.offsetHeight || 64; // number | function(element, index)
		this.status = new Map();
		this.shortcut = {
			toggle: 'space|enter'
		};
		this.canMove = false;
		this.canResize = false;
	}
}