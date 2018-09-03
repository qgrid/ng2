import { Directive, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';

const DATEPATTERN_1 = /^\d{1,2}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{4}$/g; // Month/Day/Year Day/Month/Year
const DATEPATTERN_2 = /^\d{4}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{1,2}$/g; // Year/Day/Date Year/Day/Month

@Directive({
	selector: '[q-grid-date]'
})
export class DateDirective {
	constructor(templateRef: TemplateRef<DateDirective>, viewContainerRef: ViewContainerRef) {
		viewContainerRef.createEmbeddedView(templateRef, this);
	}

	isValid(text) {
		if ((text.search(DATEPATTERN_1) === 0) || (text.search(DATEPATTERN_2) === 0)) {
			return true;
		}

		return false;
	}
}
