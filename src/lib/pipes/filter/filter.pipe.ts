import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'ng2-qgrid/core/utility/kit';
import { compileGet } from 'ng2-qgrid/core/services/path';

@Pipe({
	name: 'qGridFilter'
})
export class FilterPipe implements PipeTransform {
	transform(items: any, filter: any): any {
		if (filter || filter === 0 || filter === false) {
			if (isObject(filter)) {
				// TODO: improve performance
				const getters = Object
					.keys(filter)
					.map(key => {
						const value = compileGet(key);
						return { key, value };
					});

				return items.filter(item =>
					getters.reduce((memo, get) =>
						(memo && new RegExp(filter[get.key], 'gi').test(get.value(item)) || filter[get.key] === ''),
						true));
			}

			const expr = new RegExp(filter, 'gi');
			return items.filter(item => expr.test(item));
		}

		return items;
	}
}
