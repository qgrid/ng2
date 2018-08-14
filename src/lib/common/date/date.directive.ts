import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[q-grid-date]'
})
export class DateDirective {
    constructor(templateRef: TemplateRef<DateDirective>, viewContainerRef: ViewContainerRef) {
        viewContainerRef.createEmbeddedView(templateRef, this);
    }

    isValid(text) {
        if (text.search(/^\d{1,2}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{4}$/g) !== 0) {
            return false;
        }

        text = text.replace(/[\-|\.|_]/g, '/');
        const date = new Date(Date.parse(text));
        const dateParts = text.split('/');

        return (
            date.getMonth() === +(dateParts[0] - 1) &&
            date.getDate() === +(dateParts[1]) &&
            date.getFullYear() === +(dateParts[2])
        );
    }
}
