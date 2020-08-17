import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { parseFactory } from '@qgrid/core/services/convert';

const DATE_PATTERN_1 = /^\d{1,2}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{4}$/g; // Month/Day/Year Day/Month/Year
const DATE_PATTERN_2 = /^\d{4}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{1,2}$/g; // Year/Day/Date Year/Day/Month

@Directive({
	selector: '[q-grid-date]'
})
export class DateDirective {
	private parseDate = parseFactory('date');

	constructor(
		templateRef: TemplateRef<any>,
		viewContainerRef: ViewContainerRef
	) {
		viewContainerRef.createEmbeddedView(templateRef, { $implicit: this });
	}

	isValid(text) {
		if ((text.search(DATE_PATTERN_1) === 0) || (text.search(DATE_PATTERN_2) === 0)) {
			return true;
		}

		return false;
	}

	dateLow(value: Date) {
		if (value) {
			const midnight = new Date(value.getTime());
			midnight.setHours(0, 0, 0, 0);
			return midnight;
		}

		return value;
	}

	dateHight(value: Date) {
		if (value) {
			const midnight = new Date(value.getTime());
			midnight.setHours(23, 59, 59, 999);
			return midnight;
		}

		return value;
	}

	datetime(previous: Date, current: Date) {
		const previousDate = this.parseDate(previous) as Date;
		if (previous) {
			const sameHours = new Date(current.getTime());
			sameHours.setHours(
				previousDate.getHours(),
				previousDate.getMinutes(),
				previousDate.getSeconds(),
				previousDate.getMilliseconds(),
			);

			return sameHours;
		}

		return current;
	}
}
