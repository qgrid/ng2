import { Resource } from '../resource/resource';

export class PaginationState {
	constructor() {
		this.resource = new Resource();

		this.current = 0;
		this.size = 50;
		this.sizeList = [5, 10, 20, 30, 40, 50];
		this.count = 0;
		this.mode = 'showPages'; 

		this.resetTriggers = {
			'filter': ['by'],
			'pivot': ['by'],
			'group': ['by']
		};

		this.shortcut = {
			prev: 'alt+pageup',
			next: 'alt+pagedown',
		};
	}
}
