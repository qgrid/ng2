import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { parseFactory } from '@qgrid/core';
import { DateService } from './date.service';

@Directive({
  selector: '[q-grid-date]',
})
export class DateDirective {
  private toMidnight: (x: Date | string) => Date = parseFactory('date');

  constructor(
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
		private dateService: DateService,
  ) {
    viewContainerRef.createEmbeddedView(templateRef, { $implicit: this });
  }

  isValid(dateOrText: Date | string, format: string) {
    return this.dateService.isValid(dateOrText, format);
  }

  dateLow(value: Date | string, format: string) {
    const date = this.dateService.parseDateTime(value, format);
    if (date) {
      return this.toMidnight(date);
    }

    return value;
  }

  datetime(previous: Date | string, current: Date | string, format: string) {
    const previousDate = this.dateService.parseDateTime(previous, format);
    const currentDate = this.dateService.parseDateTime(current, format);
    if (previousDate && currentDate) {
      const midnight = this.toMidnight(currentDate);
      const sameHours = new Date(
        midnight.getFullYear(),
        midnight.getMonth(),
        midnight.getDate(),
        previousDate.getHours(),
        previousDate.getMinutes(),
        previousDate.getSeconds(),
        previousDate.getMilliseconds(),
      );

      return sameHours;
    }

    if (currentDate) {
      return this.toMidnight(currentDate);
    }

    return current;
  }
}
