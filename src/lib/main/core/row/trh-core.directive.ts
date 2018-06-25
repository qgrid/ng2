import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Tr } from 'ng2-qgrid/core/dom/tr';
import { ViewCoreService } from '../view/view-core.service';
import { RootService } from '../../../infrastructure/component/root.service';

@Directive({
	selector: '[q-grid-core-trh]'
})
export class TrhCoreDirective implements Tr, OnInit, OnDestroy {
	@Input('q-grid-core-index') index: number;
	@Input('q-grid-core-trh') model: any;
	@Input('q-grid-core-source') source;

	element: HTMLElement;

	constructor(
		public $view: ViewCoreService,
		private root: RootService,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement;
	}

	ngOnInit() {
		this.root.bag[this.source].addRow(this);
	}

	ngOnDestroy() {
		this.root.bag[this.source].deleteRow(this);
	}
}
