import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[q-grid-stop-propagate]'
})
export class StopPropagateDirective implements OnInit {
	@Input('q-grid-stop-propagate') key = '';

	constructor(private elementRef: ElementRef) {
	}

	ngOnInit() {
		this.elementRef.nativeElement.addEventListener(this.key, e =>
			e.stopPropagation()
		);
	}
}
