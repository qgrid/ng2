import { Pipe, PipeTransform } from '@angular/core';
import { escapeRegExp } from './app.utils';

@Pipe({
	name: 'appHighlight'
})
export class HighlightPipe implements PipeTransform {
	transform(item: string, search: string) {
		if (search) {
			const words = search.split(',').filter(word => word).map(word => escapeRegExp(word));
			const pattern = words.map((word, index) => (index < words.length - 1) ? word + '|' : word).join('');
			const contains = new RegExp(pattern, 'gi');
			if (contains.test(item)) {
				return item.replace(contains, s => `<mark>${s}</mark>`);
			}
		}
		return item;
	}
}
