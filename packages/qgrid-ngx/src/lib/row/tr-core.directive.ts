import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { BodyCoreService } from '../body/body-core.service';
import { DomTr } from '../dom/dom';
import { GridLet } from '../grid/grid-let';
import { GridPlugin } from '../plugin/grid-plugin';

@Directive({
	selector: '[q-grid-core-tr]'
})
export class TrCoreDirective implements DomTr, OnInit, OnDestroy {
	@Input('q-grid-core-index') viewIndex: number;
	@Input('q-grid-core-tr') model: any;
	@Input('q-grid-core-source') source;

	pin: string;

	element: HTMLElement;

	constructor(
		public $view: GridLet,
		private $body: BodyCoreService,
		private plugin: GridPlugin,
		elementRef: ElementRef
	) {
		this.element = elementRef.nativeElement;
		this.pin = $body.pin;
	}

	get index() {
		return this.$view.scroll.y.container.position + this.viewIndex + this.$body.offsetIndex;
	}

	ngOnInit() {
		this.plugin.table.box.bag[this.source].addRow(this);
	}

	ngOnDestroy() {
		this.plugin.table.box.bag[this.source].deleteRow(this);
	}
}
