import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { max } from 'ng2-qgrid/core/utility';
import { RootService } from '../../infrastructure/component';
import { PositionView } from 'ng2-qgrid/plugin/position/position.view';

@Directive({
	selector: '[q-grid-position]'
})
export class PositionDirective implements OnDestroy {
	@Input('q-grid-position') public target = '';
	private position: PositionView;

	constructor(element: ElementRef, private root: RootService) {
		this.position = new PositionView({
			element: element.nativeElement,
			targetName: this.target
		});

		this.position.invalidate();
	}

	ngOnDestroy() {
		this.position.dispose();
	}
}
