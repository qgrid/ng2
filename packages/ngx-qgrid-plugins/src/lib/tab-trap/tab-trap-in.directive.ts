import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { EventListener, EventManager } from '@qgrid/core';
import { TabTrapComponent } from './tab-trap.component';

@Directive({
	selector: '[q-grid-tab-trap-in]'
})
export class TabTrapInDirective implements OnInit {
	@Input('q-grid-tab-trap-in') target: any;
	@Input('q-grid-tab-trap-host') host!: TabTrapComponent;

	constructor(private elementRef: ElementRef) {
		elementRef.nativeElement.tabIndex = 0;

		const listener = new EventListener(elementRef.nativeElement, new EventManager(this));
		listener.on('focus', () => this.host.activate(this.target));
	}

	ngOnInit() {
		this.host.traps.set(this.target, this);
	}

	focus() {
		this.elementRef.nativeElement.focus();
	}
}
