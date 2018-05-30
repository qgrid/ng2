import {
	Directive,
	ContentChild,
	EventEmitter,
	Output,
	Input,
	AfterViewInit
} from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Directive({
	selector: '[q-grid-menu-trigger]'
})
export class MenuTriggerDirective implements AfterViewInit {
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
