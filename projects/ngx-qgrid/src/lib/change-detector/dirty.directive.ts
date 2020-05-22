import { OnChanges, Directive, Input, ChangeDetectorRef } from '@angular/core';

@Directive({
	selector: '[q-grid-dirty]',
})
export class DirtyDirective implements OnChanges {
	@Input('q-grid-dirty') trigger: any;

	constructor(private cd: ChangeDetectorRef) {
	}

	ngOnChanges() {
		this.cd.markForCheck();
		this.cd.detectChanges();
	}
}
