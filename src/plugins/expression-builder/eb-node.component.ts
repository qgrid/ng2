import { Component, Input } from '@angular/core';
import { Node } from './model/node';

@Component({
	selector: '[q-grid-eb-node]',
	templateUrl: './eb-node.component.html'
})
export class EbNodeComponent {
	@Input() public node: Node;
}
