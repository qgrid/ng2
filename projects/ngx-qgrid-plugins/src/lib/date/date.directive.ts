import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { parseFactory } from '@qgrid/core/services/convert';
import { isDate } from '@qgrid/core/utility/kit';

const DATE_PATTERN_1 = /^\d{1,2}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{4}$/g; // Month/Day/Year Day/Month/Year
const DATE_PATTERN_2 = /^\d{4}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{1,2}$/g; // Year/Day/Date Year/Day/Month

@Directive({
	selector: '[q-grid-date]'
})
export class DateDirective {
	private toMidnight: (x: Date | string) => Date = parseFactory('date');

	constructor(
		templateRef: TemplateRef<any>,
		viewContainerRef: ViewContainerRef
	) {
		viewContainerRef.createEmbeddedView(templateRef, { $implicit: this });
	}

	isValid(text: string) {
		if ((text.search(DATE_PATTERN_1) === 0) || (text.search(DATE_PATTERN_2) === 0)) {
			return true;
		}

		return false;
	}

	dateLow(value: Date) {
		if (value) {
			const midnight = this.toMidnight(value);
			return midnight;
		}

		return value;
	}

	datetime(previous: Date, current: Date) {
		if (isDate(previous)) {
			const midnight = this.toMidnight(current);
			const sameHours = new Date(
				midnight.getFullYear(),
				midnight.getMonth(),
				midnight.getDate(),
				previous.getHours(),
				previous.getMinutes(),
				previous.getSeconds(),
				previous.getMilliseconds(),
			);

			return sameHours;
		}

		return current;
	}
}
