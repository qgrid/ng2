import { Directive, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[q-grid-vscroll-mark]'
})
export class VscrollMarkDirective implements OnInit, OnDestroy {
	@Input('q-grid-vscroll-mark') mark: string;

	constructor(private elementRef: ElementRef) {
	}

	ngOnInit() {
		const element = this.elementRef.nativeElement;
		const mark = this.mark;

		this.ports.forEach(port => port.markup[mark] = element);
	}

	ngOnDestroy() {
		this.ports.forEach(port => {
			if (port.markup) {
				port.markup[this.mark] = null;
			}
		});
	}
}
