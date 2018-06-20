import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

export class TimeContext {
    constructor() { }

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

@Directive({
    selector: '[q-grid-time]'
})

export class TimeDirective {
    constructor(
        private templateRef: TemplateRef<TimeContext>,
        private viewContainerRef: ViewContainerRef
    ) {
        const context = new TimeContext();
        viewContainerRef.createEmbeddedView(templateRef, context);
     }
}