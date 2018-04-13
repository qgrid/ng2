import { Component, Input } from '@angular/core';
import { Line } from './model/line';
import { Node } from './model/node';

@Component({
	selector: 'q-grid-eb-expression',
	templateUrl: './eb-expression.component.html'
})
export class EbExpressionComponent {
	@Input() public node: Node;
	@Input() public line: Line;
	@Input() public model: any;
}
