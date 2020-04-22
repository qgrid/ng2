import { Pipe, PipeTransform } from '@angular/core';
import { escapeRegExp } from './app.utils';

@Pipe({
	name: 'appFilter'
})
export class FilterSearchPipe implements PipeTransform {
	transform(items: any[], search: string) {
		if (search && items) {
			const words = search.split(',').filter(word => word).map(word => escapeRegExp(word));
			const pattern = words.map((word, index) => (index < words.length - 1) ? word + '|' : word).join('');
			const contains = new RegExp(pattern, 'i');
			return items.filter(item => contains.test(item.path));
		}

		return items;
	}
}
