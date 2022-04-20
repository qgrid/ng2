import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { parseFactory } from '@qgrid/core';

@Directive({
	selector: '[q-grid-time]'
})
export class TimeDirective {
	private toMidnight: (x: Date | string) => Date = parseFactory('date');

	constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
		viewContainerRef.createEmbeddedView(templateRef, { $implicit: this });
	}

	time(previous, current) {
		if (!previous) {
			previous = new Date();
		}

		const midnight = this.toMidnight(previous);
		const [
			hours,
			minutes,
			seconds,
			ms
		] = current.split(':');

		if (hours && minutes) {
			const time = new Date(
				midnight.getFullYear(),
				midnight.getMonth(),
				midnight.getDate(),
				+hours,
				+minutes,
				seconds ? +seconds : 0,
				ms ? +ms : 0
			);

			return time;
		}

		return midnight;
	}
}
