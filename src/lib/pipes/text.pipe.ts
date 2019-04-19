import { Pipe, PipeTransform } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';

@Pipe({
    name: 'qGridText'
})
export class TextPipe implements PipeTransform {
    transform(item: string, inputFormatType: string): string {
        switch (inputFormatType) {
            case 'fromCamelCase': {
                const lcAll = item.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
                const ucFirst = lcAll.charAt(0).toUpperCase() + lcAll.slice(1);
                return ucFirst;
            }
            default: {
                throw new AppError('text.pipe', `Unknown input format type '${inputFormatType}'`);
            }
        }
    }
}
