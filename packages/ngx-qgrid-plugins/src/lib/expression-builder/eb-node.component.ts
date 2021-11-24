import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Node } from './model/node';
import { EbNodeService } from './eb-node.service';

@Component({
	selector: 'q-grid-eb-node',
	templateUrl: './eb-node.component.html',
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class EbNodeComponent {
	@Input() model: Node;

	constructor(public service: EbNodeService) {
	}

	select(e) {
		e.stopPropagation();

		if (this.model.parent) {
			this.service.current = this.model;
		}
	}
}
