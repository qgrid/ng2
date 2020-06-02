import { OnChanges, Directive, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[q-grid-dirty]',
})
export class DirtyDirective implements OnChanges {
	@Input('q-grid-dirty') trigger: any;

	constructor(private cd: ChangeDetectorRef) {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.trigger) {
			if (!changes.trigger.firstChange) {
				this.cd.detectChanges();
			}
		}
	}
}
