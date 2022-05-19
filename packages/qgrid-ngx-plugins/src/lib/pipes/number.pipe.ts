import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Log } from '@qgrid/core';

@Pipe({
  name: 'qGridNumber',
})
export class NumberPipe implements PipeTransform {
  constructor(
    private pipe: DecimalPipe,
  ) { }

  transform(value: string | number | unknown, digitsInfo?: string, locale?: string) {
    try {
      return this.pipe.transform(value as string | number, digitsInfo, locale);
    } catch (ex) {
      Log.warn('NumberPipe', ex.message);
      return value as string;
    }
  }
}
