import {
	Directive,
	ContentChild,
	EventEmitter,
	Output,
	Input
} from '@angular/core';
import { ViewChild } from '@angular/core/src/metadata/di';
import { MatMenuTrigger } from '@angular/material';

@Directive({
	selector: '[q-grid-menu-trigger]'
})
export class MenuTriggerDirective {
	@ContentChild(MatMenuTrigger) public trigger: MatMenuTrigger;
	@Output('q-grid-menu-trigger') public onClose = new EventEmitter<any>();

	constructor() {}

	ngAfterViewInit() {
		this.trigger.openMenu();
		this.trigger.menuClosed.subscribe(() => {
			if (this.onClose) {
				setTimeout(() => this.onClose.emit(), 10);
			}
		});
	}
}
