import { Directive, Input, ElementRef, NgZone, OnInit } from '@angular/core';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { TabTrapComponent } from './tab-trap.component';

@Directive({
	selector: '[q-grid-tab-trap-in]'
})
export class TabtrapInDirective implements OnInit {
	@Input('q-grid-tab-trap-in') target;
	@Input('q-grid-tab-trap-host') host: TabTrapComponent;

	constructor(private element: ElementRef) {
		element.nativeElement.tabIndex = 0;

		const listener = new EventListener(element.nativeElement, new EventManager(this));
		listener.on('focus', () => this.host.activate(this.target));
	}

	ngOnInit() {
		this.host.traps.set(this.target, this);
	}

	focus() {
		this.element.nativeElement.focus();
	}
}
