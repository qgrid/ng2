import { Component, Input, EventEmitter, Output, OnInit, ElementRef } from '@angular/core';
import { Node } from './model/node';
import { EbNodeService } from './eb-node.service';

@Component({
	selector: 'q-grid-eb-node',
	templateUrl: './eb-node.component.html'
})
export class EbNodeComponent implements OnInit {
	@Input() model: Node;
	@Input() parent: EbNodeComponent;

	self = this;
	element: HTMLElement;
	children = new Array<EbNodeComponent>();

	constructor(
		private service: EbNodeService,
		element: ElementRef) {
		this.element = element.nativeElement;
	}

	ngOnInit() {
		this.service.currentNode = this;
		if (this.parent) {
			this.parent.children.push(this);
		}
	}

	ngOnDestroy() {
		if (this.parent) {
			const children = this.parent.children;
			const index = children.indexOf(this);
			if (index >= 0) {
				children.splice(index, 1);
				if (index > 0) {
					this.service.currentNode = children[index - 1];
				} else {
					this.service.currentNode = this.parent;
				}
			}
		}
	}

	select(e) {
		e.stopPropagation();

		this.service.currentNode = this;
	}
}
