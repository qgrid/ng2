import {
	Directive,
	ApplicationRef,
	NgZone,
	ChangeDetectorRef
} from '@angular/core';

@Directive({
	selector: '[q-grid-chips]'
})
export class ChipsDirective {
	constructor(private app: ApplicationRef, private zone: NgZone, public cd: ChangeDetectorRef) { }

	tick() {
		this.app.tick();
	}
}
