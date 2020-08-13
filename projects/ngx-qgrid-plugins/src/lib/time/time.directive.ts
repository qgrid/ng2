import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[q-grid-time]'
})
export class TimeDirective {
	constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
		viewContainerRef.createEmbeddedView(templateRef, { $implicit: this });
	}

	time(previous, current) {
		if (!previous) {
			previous = new Date();
		}

		const date = new Date(previous.getTime());
		const [hours, minutes, seconds, ms] = current.split(':');

		if (hours && minutes) {
			date.setHours(+hours);
			date.setMinutes(+minutes);

			if (seconds) {
				date.setSeconds(+seconds);
			} else {
				date.setSeconds(0);
			}

			if (ms) {
				date.setMilliseconds(+ms);
			} else {
				date.setMilliseconds(0);
			}
		}

		return date;
	}
}
