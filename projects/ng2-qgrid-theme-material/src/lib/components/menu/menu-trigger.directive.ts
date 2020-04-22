import {
	Directive,
	ContentChild,
	EventEmitter,
	Output,
	AfterViewInit
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Directive({
	selector: '[q-grid-menu-trigger]'
})
export class MenuTriggerDirective implements AfterViewInit {
	@ContentChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
	@Output('q-grid-menu-trigger') onClose = new EventEmitter<any>();

	constructor() {}

	ngAfterViewInit() {
		Promise.resolve(null).then(() => this.trigger.openMenu());

		this.trigger.menuClosed.subscribe(() => {
			if (this.onClose) {
				setTimeout(() => this.onClose.emit(), 10);
			}
		});
	}
}
