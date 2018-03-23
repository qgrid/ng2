import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { sizeFactory } from './vscroll.container';
import { VscrollPortXDirective } from './vscroll-port-x.directive';

@Directive({
	selector: '[q-grid-vscroll-column]'
})
export class VscrollColumnDirective implements OnInit, OnDestroy {
	@Input('q-grid-vscroll-column') index: number;

	constructor(private elementRef: ElementRef, private port: VscrollPortXDirective) {
	}

	ngOnInit() {
		const layout = this.port.layout;
		const column = this.elementRef.nativeElement;
		const context = this.port.context;
		const size = sizeFactory(context.settings.columnWidth, context.container, column, this.index);
		layout.setItem(this.index, size);
	}

	ngOnDestroy() {
		this.port.layout.removeItem(this.index);
	}
}
