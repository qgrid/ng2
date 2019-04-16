import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSearch'
})

export class FilterSearch implements PipeTransform {
    transform(item: string, search: string) {
        if (item && search) {
            const contains = new RegExp(search, 'gi');
            if (contains.test(item)) {
                return true;
            }
        } else {
            return true;
        }
    }
}
