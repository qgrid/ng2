import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'beautify'
})
export class BeautifyPipe implements PipeTransform {
    transform(camelCaseString: string): string {
		const lcAll = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
		const ucFirst = lcAll.charAt(0).toUpperCase() + lcAll.slice(1);

        return ucFirst;
    }
}
