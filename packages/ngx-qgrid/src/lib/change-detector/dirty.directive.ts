import { ChangeDetectorRef, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[q-grid-dirty]',
})
export class DirtyDirective implements OnChanges {
	@Input('q-grid-dirty') trigger: any;

	constructor(private cd: ChangeDetectorRef) {
	}

	ngOnChanges(changes: SimpleChanges) {
		const { trigger } = changes;

		if (trigger) {
			if (!trigger.firstChange) {
				this.cd.detectChanges();
			}
		}
	}
}
