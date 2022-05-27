import { DatePipe as NgDatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Log } from '@qgrid/core';

@Pipe({
  name: 'qGridDate',
})
export class DatePipe implements PipeTransform {
  constructor(private pipe: NgDatePipe) { }

  transform(value: string | number | Date, format?: string, timezone?: string, locale?: string) {
    try {
      // The value expression: a Date object, a number (milliseconds since UTC epoch), or an ISO string
      return this.pipe.transform(value, format, timezone, locale);
    } catch (ex) {
      Log.warn('DatePipe', ex.message);
      return value as string;
    }
  }
}
