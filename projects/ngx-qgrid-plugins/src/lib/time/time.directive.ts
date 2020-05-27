import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[q-grid-time]'
})
export class TimeDirective {
	constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
		viewContainerRef.createEmbeddedView(templateRef, { $implicit: this });
	}

	time(previous, current) {
		const date = new Date(previous);
		const [hours, minutes, seconds, ms] = current.split(':');

		if (hours && minutes) {
			date.setHours(+hours);
			date.setMinutes(+minutes);

			if (seconds) {
				date.setSeconds(+seconds);
			}

			if (ms) {
				date.setMilliseconds(+ms);
			}
		}

		return date;
	}
}
