import { Directive, ApplicationRef } from '@angular/core';

@Directive({
	selector: '[q-grid-chips]'
})
export class ChipsDirective {
	constructor(
		private app: ApplicationRef
	) { }

	tick() {
		this.app.tick();
	}
}
