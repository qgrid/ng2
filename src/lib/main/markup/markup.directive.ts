import { Directive, ElementRef, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';

@Directive({
	selector: '[q-grid-markup]'
})
export class MarkupDirective implements OnInit, OnDestroy {
	@Input('q-grid-markup') name = '';

	constructor(
		private root: RootService,
		private elementRef: ElementRef
	) { }

	ngOnInit() {
		this.root.markup[this.name] = this.elementRef.nativeElement;
	}

	ngOnDestroy() {
		delete this.root.markup[this.name];
	}
}
