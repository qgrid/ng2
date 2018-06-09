import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Tr } from 'ng2-qgrid/core/dom/tr';
import { ViewCoreService } from '../view/view-core.service';
import { RootService } from '../../../infrastructure/component/root.service';

@Directive({
	selector: '[q-grid-core-tr]'
})
export class TrCoreDirective implements Tr, OnInit, OnDestroy {
	@Input('q-grid-core-index') public index: number;
	@Input('q-grid-core-tr') public model: any;
	@Input('q-grid-core-source') public source;

	public element: HTMLElement;

	constructor(
		public $view: ViewCoreService,
		private root: RootService,
		private elementRef: ElementRef
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
