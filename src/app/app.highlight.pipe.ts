import { Pipe, PipeTransform } from '@angular/core';
import { regexpFromArray } from './app.component';
import { escapeRegExp } from '@angular/compiler/src/util';

@Pipe({
	name: 'appHighlight'
})
export class Highlight implements PipeTransform {
	transform(item: string, search: string) {
		if (search) {
			const words = search.split(',').map(word => escapeRegExp(word));
			const contains = regexpFromArray(words, ',');
			if (contains.test(item)) {
				return item.replace(contains, s => `<mark>${s}</mark>`);
			}
		}
		return item;
	}
}
