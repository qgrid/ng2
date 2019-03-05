import { Pipe, PipeTransform } from '@angular/core';
import { VscrollContext } from './vscroll.context';
import { Log } from 'ng2-qgrid/core/infrastructure/log';

const EMPTY_ITEMS = [];

@Pipe({
	name: 'qGridVscroll'
})
export class VscrollPipe implements PipeTransform {
	transform(data: any[], context: VscrollContext, force: boolean): any[] {
		if (!context) {
			Log.warn('VscrollPipe', 'Context is not defined');
			return EMPTY_ITEMS;
		}

		data = data || [];

		const { length } = data;
		const { container, settings } = context;

		let wnd = container.items;
		if (length) {
			const { cursor } = container;
			const { threshold } = settings;

			// We need to have a less number of virtual items on
			// the bottom, as deferred loading is happen there should
			// be a threshold place to draw several items below.
			const first = cursor;
			if (force || first !== container.position) {
				const last = Math.min(cursor + threshold, length);
				container.position = first;

				console.log(`WINDOW: ${first}:${last}`);

				wnd = new Array(last - first);
				for (let i = first, j = 0; i < last; i++ , j++) {
					wnd[j] = data[i];
				}
			}
		} else if (wnd.length) {
			wnd = [];
		}

		return wnd;
	}
}
