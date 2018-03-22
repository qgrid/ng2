import { Injectable, EventEmitter } from '@angular/core';
import { VscrollContext } from './vscroll.context';

function empty() {
	return 0;
}

@Injectable()
export class VscrollLayout {
	markup = {};
	context: VscrollContext;
	updateEvent = new EventEmitter<any>();
	items = [];

	setItem(index: number, item: () => number) {
		this.items[index] = item;
		this.updateEvent.emit({ action: 'set', index });
	}

	removeItem(index: number) {
		const items = this.items;
		let last = items.length - 1;
		if (index === 0) {
			items.shift();
		} else if (index === last) {
			items.pop();
			while (last-- && items[last] === empty) {
				items.pop();
			}
		} else {
			// TODO: think how to avoid this
			items[index] = empty;
		}

		this.updateEvent.emit({ action: 'remove', index });
	}
}
