import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[q-grid-time]'
})

export class TimeDirective {
    constructor(
        private templateRef: TemplateRef<TimeDirective>,
        private viewContainerRef: ViewContainerRef
    ) {
        viewContainerRef.createEmbeddedView(templateRef, this);
     }

     time(previous, current) {
        const date = new Date(typeof current === 'string' ? Date.now() : previous);
        const [hours, minutes, seconds] = current.split(':');

        if (hours && minutes) {
            date.setHours(+hours);
            date.setMinutes(+minutes);

            if (seconds) {
                date.setSeconds(+seconds);
            }

            return date;
        }
    }
}