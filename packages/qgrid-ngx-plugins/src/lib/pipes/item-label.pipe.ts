import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'qGridItemLabel'
})
export class ItemLabelPipe implements PipeTransform {
	constructor() { }

	transform(value: any, itemLabel: (x: any) => string) {
		if (itemLabel) {
			return itemLabel(value);
		}

		return value;
	}
}
