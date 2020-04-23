import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

const DATE_PATTERN_1 = /^\d{1,2}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{4}$/g; // Month/Day/Year Day/Month/Year
const DATE_PATTERN_2 = /^\d{4}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{1,2}$/g; // Year/Day/Date Year/Day/Month

@Directive({
	selector: '[q-grid-date]'
})
export class DateDirective {
	constructor(templateRef: TemplateRef<DateDirective>, viewContainerRef: ViewContainerRef) {
		viewContainerRef.createEmbeddedView(templateRef, this);
	}

	isValid(text) {
		if ((text.search(DATE_PATTERN_1) === 0) || (text.search(DATE_PATTERN_2) === 0)) {
			return true;
		}

		return false;
	}
}
