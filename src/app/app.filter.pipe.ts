import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSearch'
})

export class FilterSearch implements PipeTransform {
    transform(item: string, search: string) {
            const contains = new RegExp(search, 'gi');
            return (contains.test(item));
    }
}
