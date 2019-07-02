import { Pipe, PipeTransform } from '@angular/core';
import { escapeRegexp, regexpFromArray } from 'ng2-qgrid/core/utility/kit';

@Pipe({
	name: 'filter'
})
export class FilterSearch implements PipeTransform {
	transform(items: any[], search: string) {
		if (search) {
			const searchArray = search.split(',').map(word => escapeRegexp(word));
			return (items).filter(item => regexpFromArray(searchArray, ',').test(item.path));
		}
		return items;
	}
}
