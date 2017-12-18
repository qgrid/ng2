import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'qGridFilter'
})
export class FilterPipe implements PipeTransform {
	transform(items: any, filter: any): any {
		if (filter) {
			// TODO: improve perfomance
			const keys = Object.keys(filter);
			return items.filter(item =>
				keys.reduce((memo, key) =>
					(memo && new RegExp(filter[key], 'gi').test(item[key])) || filter[key] === '',
					true));
		}

		return items;
	}
}
