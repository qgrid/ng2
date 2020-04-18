import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { DomTr } from '../dom/dom';
import { GridView } from '../grid/grid-view';
import { GridRoot } from '../grid/grid-root';

@Directive({
	selector: '[q-grid-core-tr]'
})
export class TrCoreDirective implements DomTr, OnInit, OnDestroy {
	@Input('q-grid-core-index') viewIndex: number;
	@Input('q-grid-core-tr') model: any;
	@Input('q-grid-core-source') source;

	element: HTMLElement;

	constructor(
		public $view: GridView,
		private root: GridRoot,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement;
	}

	get index() {
		return this.$view.scroll.y.container.position + this.viewIndex;
	}

	ngOnInit() {
		this.root.bag[this.source].addRow(this);
	}

	ngOnDestroy() {
		this.root.bag[this.source].deleteRow(this);
	}
}
