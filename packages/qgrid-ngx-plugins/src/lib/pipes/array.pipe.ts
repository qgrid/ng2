import { Pipe, PipeTransform } from '@angular/core';
import { isArray, isUndefined, Log } from '@qgrid/core';

@Pipe({
  name: 'qGridArray',
})
export class ArrayPipe implements PipeTransform {
  transform(value: any) {
    if (isArray(value)) {
      return value;
    }

    Log.warn('ArrayPipe', `${value} is not of array type`);
    return isUndefined(value) || value === null ? [] : [value];
  }
}
