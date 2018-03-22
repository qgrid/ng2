import { Pipe, PipeTransform } from '@angular/core';
import { VscrollContext } from './vscroll.context';
import { AppError } from 'ng2-qgrid/core/infrastructure';

const empty = [];

@Pipe({
	name: 'qGridVscroll'
})
export class VscrollPipe implements PipeTransform {
	transform(data: any, context: VscrollContext): any {
		if (!data) {
			return empty;
		}

		if (!context) {
			throw new AppError('vscroll.pipe', 'filter context is not set');
		}

		const count = data.length;
		const container = context.container;

		container.update(count);
		if (count) {
			const view = container.items;
			const cursor = container.cursor;
			const settings = context.settings;
			const threshold = settings.threshold;
			const first = cursor;
			if (container.force || first !== container.position) {
				const last = Math.min(cursor + threshold, count);
				container.position = first;
				container.drawEvent.emit({
					first,
					last,
					position: cursor
				});

				view.length = last - first;
				for (let i = first, j = 0; i < last; i++ , j++) {
					view[j] = data[i];
				}

				container.force = false;
			}

			return view;
		}

		return empty;
	}
}
