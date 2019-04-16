import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'highlightSearch'
})

export class HighlightSearch implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(item: string, search: string): SafeHtml {
        if (search && item) {
            const contains = new RegExp(search, 'gi');
            if (contains.test(item)) {
                return this.sanitizer.bypassSecurityTrustHtml(item.replace(contains, elem => `<span class='highlight'>${elem}</span>`));
            }
        } else {
            return item;
        }
    }
}
