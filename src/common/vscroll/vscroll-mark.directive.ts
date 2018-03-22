import { Directive, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { VscrollLayout } from './vscroll.layout';

@Directive({
	selector: '[q-grid-vscroll-mark]'
})
export class VscrollMarkDirective implements OnInit, OnDestroy {
	@Input('q-grid-vscroll-mark') key: string;

	constructor(private elementRef: ElementRef, private layout: VscrollLayout) {
	}

	ngOnInit() {
		const element = this.elementRef.nativeElement;
		const key = this.key;

		this.layout.markup[key] = element;
	}

	ngOnDestroy() {
		delete this.layout.markup[this.key];
	}
}
