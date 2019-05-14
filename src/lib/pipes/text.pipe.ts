import { Pipe, PipeTransform } from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';

@Pipe({
	name: 'qGridText'
})
export class TextPipe implements PipeTransform {
	transform(item: string, format: 'fromCamelCase'): string {
		switch (format) {
			case 'fromCamelCase': {
				return item.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
			}
			default: {
				throw new AppError('text.pipe', `Unknown input format type '${format}'`);
			}
		}
	}
}
