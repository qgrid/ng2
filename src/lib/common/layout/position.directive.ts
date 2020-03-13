import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PositionView } from 'ng2-qgrid/plugin/position/position.view';
import { Disposable } from '../../infrastructure/disposable';

@Directive({
	selector: '[q-grid-position]',
	providers: [Disposable]
})
export class PositionDirective implements OnInit {
	private position: PositionView;

	@Input('q-grid-position') target = '';

	constructor(
		private elementRef: ElementRef,
		private disposable: Disposable
	) {
	}

	ngOnInit() {
		this.position = new PositionView({
			element: this.elementRef.nativeElement,
			targetName: this.target,
		},
			this.disposable
		);

		this.position.invalidate();
	}
}
