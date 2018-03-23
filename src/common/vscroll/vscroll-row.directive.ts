import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { sizeFactory } from './vscroll.container';
import { VscrollPortYDirective } from './vscroll-port-y.directive';

@Directive({
	selector: '[q-grid-vscroll-row]'
})
export class VscrollRowDirective implements OnInit, OnDestroy {
	@Input('q-grid-vscroll-row') index: number;

	constructor(private elementRef: ElementRef, private port: VscrollPortYDirective) {
	}

	ngOnInit() {
		const layout = this.port.layout;
		const column = this.elementRef.nativeElement;
		const context = this.port.context;
		const size = sizeFactory(context.settings.rowHeight, context.container, column, this.index);
		layout.setItem(this.index, size);
	}

	ngOnDestroy() {
		this.port.layout.removeItem(this.index);
	}
}
