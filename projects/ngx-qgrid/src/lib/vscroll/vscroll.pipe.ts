import { Pipe, PipeTransform } from '@angular/core';
import { Log } from '@qgrid/core/infrastructure/log';
import { IVscrollContainer } from './vscroll.container';
import { IVscrollSettings } from './vscroll.settings';

const EMPTY_ITEMS = [];
@Pipe({
	name: 'qGridVscroll',
	pure: false
})
export class VscrollPipe implements PipeTransform {
	transform(data: any[], context: { settings: IVscrollSettings, container: IVscrollContainer }): any[] {
		if (!context) {
			Log.warn('VscrollPipe', 'Context is not defined');
			return EMPTY_ITEMS;
		}

		data = data || [];

		const { length } = data;
		const { container, settings } = context;

		container.update(length);

		let wnd = container.items;
		if (length) {
			const { cursor } = container;
			const { threshold } = settings;

			// We need to have a less number of virtual items on
			// the bottom, as deferred loading is happen there should
			// be a threshold place to draw several items below.
			const first = cursor;
			if (container.force || first !== container.position) {
				const last = Math.min(cursor + threshold, length);
				container.position = first;
				wnd = new Array(last - first);
				for (let i = first, j = 0; i < last; i++ , j++) {
					wnd[j] = data[i];
				}

				container.force = false;
			}
		} else if (wnd.length) {
			wnd = EMPTY_ITEMS;
		}

		container.items = wnd;
		return wnd;
	}
}
