import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { max } from 'ng2-qgrid/core/utility';
import { RootService } from '../../infrastructure/component/root.service';
import { PositionView } from 'ng2-qgrid/plugin/position/position.view';

@Directive({
	selector: '[q-grid-position]'
})
export class PositionDirective implements OnDestroy, OnInit {
	@Input('q-grid-position') public target = '';
	private position: PositionView;

	constructor(private element: ElementRef, private root: RootService) {
	}

	ngOnInit() {
		this.position = new PositionView({
			element: this.element.nativeElement,
			targetName: this.target
		});

		this.position.invalidate();
	}

	ngOnDestroy() {
		this.position.dispose();
	}
}
