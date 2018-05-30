import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { max } from 'ng2-qgrid/core/utility/kit';
import { RootService } from '../../infrastructure/component/root.service';

@Directive({
	selector: '[q-grid-stop-propagate]'
})
export class StopPropagateDirective implements OnInit {
	@Input('q-grid-stop-propagate') public key = '';

	constructor(private element: ElementRef) {
	}

	ngOnInit() {
		this.element.nativeElement.addEventListener(this.key, e =>
			e.stopPropagation()
		);
	}
}
