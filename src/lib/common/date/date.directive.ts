import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

const DATEPATTERN_1 = /^\d{1,2}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{4}$/g; // Month/Date/Year Date/Month/Year
const DATEPATTERN_2 = /^\d{4}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{1,2}$/g; // Year/Month/Date Year/Date/Month

@Directive({
    selector: '[q-grid-date]'
})
export class DateDirective {
    constructor(templateRef: TemplateRef<DateDirective>, viewContainerRef: ViewContainerRef) {
        viewContainerRef.createEmbeddedView(templateRef, this);
    }

    isValid(text) {
        if (!(text.search(DATEPATTERN_1) === 0) && !(text.search(DATEPATTERN_2) === 0)) {
            return false;
        }

        const date = new Date(text);

        return date instanceof Date && !isNaN(date as any);
    }
}
