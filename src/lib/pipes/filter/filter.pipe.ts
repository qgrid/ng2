import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'ng2-qgrid/core/utility/kit';

@Pipe({
	name: 'qGridFilter'
})
export class FilterPipe implements PipeTransform {
	transform(items: any, filter: any): any {
		if (filter || filter === 0 || filter === false) {
			if (isObject(filter)) {
				// TODO: improve perfomance
				const keys = Object.keys(filter);
				return items.filter(item =>
					keys.reduce((memo, key) =>
						(memo && new RegExp(filter[key], 'gi').test(item[key])) || filter[key] === '',
						true));
			}

			const expr = new RegExp(filter, 'gi');
			return items.filter(item => expr.test(item));
		}

		return items;
	}
}
