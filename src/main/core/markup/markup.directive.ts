import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {RootService} from '@grid/infrastructure/component';

@Directive({
	selector: '[q-grid-markup]'
})
export class MarkupDirective implements OnInit, OnDestroy {
	@Input('q-grid-markup') name = '';

	constructor(private root: RootService, private element: ElementRef) {
	}

	ngOnInit() {
		this.root.markup[this.name] = this.element.nativeElement;
	}

	ngOnDestroy() {
		delete this.root.markup[this.name];
	}
}
