import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { DomTr } from '../dom/dom';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';

@Directive({
	selector: '[q-grid-core-trh]'
})
export class TrhCoreDirective implements DomTr, OnInit, OnDestroy {
	@Input('q-grid-core-index') index: number;
	@Input('q-grid-core-trh') model: any;
	@Input('q-grid-core-source') source;

	element: HTMLElement;

	constructor(
		public $view: GridLet,
		private plugin: GridPlugin,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement;
	}

	ngOnInit() {
		this.plugin.table.box.bag[this.source].addRow(this);
	}

	ngOnDestroy() {
		this.plugin.table.box.bag[this.source].deleteRow(this);
	}
}
