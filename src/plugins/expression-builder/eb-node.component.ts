import { Component, Input, EventEmitter, Output, OnInit, ElementRef } from '@angular/core';
import { Node } from './model/node';
import { EbNodeService } from './eb-node.service';

@Component({
	selector: 'q-grid-eb-node',
	templateUrl: './eb-node.component.html'
})
export class EbNodeComponent implements OnInit {
	@Input() model: Node;
	element: HTMLElement;

	constructor(private service: EbNodeService, element: ElementRef) {
		this.element = element.nativeElement;
	}

	ngOnInit() {
		if (!this.service.currentNode) {
			this.service.currentNode = this;
		}
	}

	select(e) {
		e.stopPropagation();

		this.service.currentNode = this;
	}
}
