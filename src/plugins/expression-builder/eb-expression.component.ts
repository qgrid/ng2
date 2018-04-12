import { Component, Input } from '@angular/core';
import { Line } from './line';
import { Node } from './node';

@Component({
	selector: '[q-grid-eb-expression]',
	template: '<div></div>'
})
export class EbExpressionComponent {
	@Input() public node: Node;
	@Input() public line: Line;
	@Input() public expression: any;
}
