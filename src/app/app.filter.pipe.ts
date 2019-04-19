import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterSearch implements PipeTransform {
    transform(items: any[], search: string) {
        const contains = new RegExp(search, 'gi');
        return items.filter(item => contains.test(item.path));
    }
}
