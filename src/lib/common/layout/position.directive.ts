import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { PositionView } from 'ng2-qgrid/plugin/position/position.view';

@Directive({
	selector: '[q-grid-position]'
})
export class PositionDirective implements OnDestroy, OnInit {
	private position: PositionView;

	@Input('q-grid-position') target = '';

	constructor(private elementRef: ElementRef) {
	}

	ngOnInit() {
		this.position = new PositionView({
			element: this.elementRef.nativeElement,
			targetName: this.target
		});

		this.position.invalidate();
	}

	ngOnDestroy() {
		if (this.position) {
			this.position.dispose();
			this.position = null;
		}
	}
}
