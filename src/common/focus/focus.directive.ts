import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
	selector: '[q-grid-focus]'
})
export class FocusDirective implements OnInit {
	constructor(private elementRef: ElementRef) {
	}

	ngOnInit() {
		this.elementRef.nativeElement.focus();
	}
}
