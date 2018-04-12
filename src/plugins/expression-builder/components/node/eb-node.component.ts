import {Component, Input} from '@angular/core';
import {Node} from '../model/node';

@Component({
	selector: '[expression-builder-node]',
	templateUrl: './node.html'
})
export class EbNodeComponent {
	@Input() public node: Node;
}
