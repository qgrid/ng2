import { Pipe, PipeTransform } from '@angular/core';
import { VscrollContext } from './vscroll.context';
import { Log } from 'ng2-qgrid/core/infrastructure/log';

const EMPTY_ITEMS = [];

@Pipe({
	name: 'qGridVscroll',
	pure: false
})
export class VscrollPipe implements PipeTransform {
	transform(data: any[], context: VscrollContext): any[] {
		if (!context) {
			Log.warn('VscrollPipe', 'Context is not defined');
			return EMPTY_ITEMS;
		}

		data = data || [];

		const { length } = data;
		const { container, settings } = context;

		container.update(length);
		if (length) {
			const { items, cursor } = container;
			const { threshold } = settings;

			// We need to have a less number of virtual items on
			// the bottom, as deferred loading is happen there should
			// be a threshold place to draw several items below.
			const first = cursor;
			if (container.force || first !== container.position) {
				const last = Math.min(cursor + threshold, length);
				container.position = first;

				const wnd = new Array(last - first);
				for (let i = first, j = 0; i < last; i++ , j++) {
					wnd[j] = data[i];
				}

				container.force = false;
				container.items = wnd;
				return wnd;
			}

			return items;
		}

		container.items = [];
		return EMPTY_ITEMS;
	}
}
