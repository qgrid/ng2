import { Pipe, PipeTransform } from '@angular/core';
import { VscrollContext } from './vscroll.context';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';

const empty = [];

@Pipe({
	name: 'qGridVscroll',
	pure: false
})
export class VscrollPipe implements PipeTransform {
	transform(data: any, context: VscrollContext): any {
		Guard.notNull(context, 'context');

		if (!data) {
			return empty;
		}

		const count = data.length;
		const { container, settings } = context;

		container.update(count);
		if (count) {
			const { items, cursor } = container;
			const { threshold } = settings;

			// We need to have a less number of virtual items on
			// the bottom, as deferred loading is happen there should
			// be a threshold place to draw several items below.
			const first = cursor;
			if (container.force || first !== container.position) {
				const last = Math.min(cursor + threshold, count);
				container.position = first;
				items.length = last - first;
				for (let i = first, j = 0; i < last; i++ , j++) {
					items[j] = data[i];
				}

				container.force = false;
			}

			for (let item of items) {
				if (!item) {
					debugger;
				}
			}

			return items;
		}

		return empty;
	}
}
