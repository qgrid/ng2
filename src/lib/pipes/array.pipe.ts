import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'ng2-qgrid/core/utility/kit';
import { Log } from 'ng2-qgrid/core/infrastructure/log';

@Pipe({
	name: 'qGridArray'
})
export class ArrayPipe implements PipeTransform {
	transform(value: any) {
		if (isArray(value)) {
			return value;
		}

		Log.warn('ArrayPipe', `${value} is not of array type`);
		return [value];
	}
}
