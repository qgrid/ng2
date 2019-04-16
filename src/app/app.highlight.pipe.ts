import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlightSearch'
})

export class HighlightSearch implements PipeTransform {
    transform(item: string, search: string) {
        if (search && item) {
            const contains = new RegExp(search, 'gi');
            if (contains.test(item)) {
                return item.replace(contains, elem => `<span class='highlight'>${elem}</span>`);
            }
        } else {
            return item;
        }
    }
}
