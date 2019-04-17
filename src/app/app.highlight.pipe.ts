import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlightSearch'
})

export class HighlightSearch implements PipeTransform {
    transform(item: string, search: string) {
        const contains = new RegExp(search, 'gi');
        return (contains.test(item) && search)
            ? item.replace(contains, elem => `<span class='highlight'>${elem}</span>`)
            : item;
    }
}
