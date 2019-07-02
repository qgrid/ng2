import { Pipe, PipeTransform } from '@angular/core';
import { regexpFromArray } from './app.component';
import { escapeRegExp } from '@angular/compiler/src/util';

@Pipe({
	name: 'appFilter'
})
export class FilterSearch implements PipeTransform {
	transform(items: any[], search: string) {
		if (search) {
			const words = search.split(',').map(word => escapeRegExp(word));
			return (items).filter(item => regexpFromArray(words, ',').test(item.path));
		}
		return items;
	}
}
