import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ViewCoreService } from '../view/view-core.service';
import { RootService } from 'ng2-qgrid/infrastructure/component';

@Directive({
	selector: '[q-grid-core-tr]'
})
export class TrCoreDirective implements OnInit, OnDestroy {
	@Input('q-grid-core-index') public index: number;
	@Input('q-grid-core-tr') public model: any;
	@Input('q-grid-core-source') public source;
	@Input('q-grid-core-last') public isLast;

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

		if (this.isLast) {
			const scene = this.root.model.scene;
			scene(
				{
					round: scene().round + 1
				},
				{
					source: 'tr.core',
					behavior: 'core'
				}
			);
		}
	}

	ngOnDestroy() {
		this.root.bag[this.source].deleteRow(this);
	}
}
