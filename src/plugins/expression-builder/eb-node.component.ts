import { Component, Input, EventEmitter, Output, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Node } from './model/node';
import { EbNodeService } from './eb-node.service';

@Component({
	selector: 'q-grid-eb-node',
	templateUrl: './eb-node.component.html'
})
export class EbNodeComponent implements OnInit, OnDestroy {
	@Input() model: Node;
	element: HTMLElement;

	constructor(
		private service: EbNodeService,
		element: ElementRef) {
		this.element = element.nativeElement;
	}

	ngOnInit() {
		this.service.bag.set(this.model, this);
	}

	ngOnDestroy() {
		this.service.bag.delete(this.model);
	}

	select(e) {
		e.stopPropagation();

		this.service.current = this.model;
	}
}
