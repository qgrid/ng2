import { Directive, OnInit, OnDestroy, ElementRef, Input, Optional } from '@angular/core';
import { VscrollPortXDirective } from './vscroll-port-x.directive';
import { VscrollPortYDirective } from './vscroll-port-y.directive';
import { VscrollPort } from './vscroll.port';

@Directive({
	selector: '[q-grid-vscroll-mark]'
})
export class VscrollMarkDirective implements OnInit, OnDestroy {
	@Input('q-grid-vscroll-mark') key: string;
	private ports: Array<VscrollPort> = [];

	constructor(
		private elementRef: ElementRef,
		@Optional() portX: VscrollPortXDirective,
		@Optional() portY: VscrollPortYDirective) {
		if (portX) {
			this.ports.push(portX);
		}

		if (portY) {
			this.ports.push(portY);
		}
	}

	ngOnInit() {
		const element = this.elementRef.nativeElement;
		const key = this.key;

		this.ports.forEach(port => port.markup[key] = element);
	}

	ngOnDestroy() {
		const key = this.key;

		this.ports.forEach(port => delete port.markup[key]);
	}
}
