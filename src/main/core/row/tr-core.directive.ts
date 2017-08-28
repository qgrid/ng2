import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ViewCoreService} from '../view/view-core.service';
import {RootService} from '@grid/infrastructure/component';

@Directive({
	selector: '[q-grid-core-tr]'
})
export class TrCoreDirective implements OnInit, OnDestroy {
	@Input('q-grid-core-tr') public index: number;
	public element: HTMLElement;

	constructor(public $view: ViewCoreService, private root: RootService, private elementRef: ElementRef) {
		this.element = elementRef.nativeElement;
	}

	ngOnInit() {
		this.root.bag.body.addRow(this);
	}

	ngOnDestroy() {
		this.root.bag.body.deleteRow(this);
	}
}
