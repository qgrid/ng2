import { Pipe, PipeTransform } from '@angular/core';
import { escapeRegexp, regexpFromArray } from 'ng2-qgrid/core/utility/kit';

@Pipe({
	name: 'highlight'
})
export class HighlightSearch implements PipeTransform {
	transform(item: string, search: string) {
		if (search) {
			const searchArray = search.split(',').map(word => escapeRegexp(word));
			const contains = regexpFromArray(searchArray, ',');
			if (contains.test(item)) {
				return item.replace(contains, s => `<mark>${s}</mark>`);
			}
		}
		return item;
	}
}
