import { Component, Input, OnInit } from '@angular/core';
import { Line } from './model/line';
import { Node } from './model/node';

@Component({
	selector: 'q-grid-eb-expression',
	templateUrl: './eb-expression.component.html'
})
export class EbExpressionComponent implements OnInit {
	@Input() public node: Node;
	@Input() public line: Line;
	@Input() public model: any;

	context: any;

	ngOnInit() {
		this.context = { $implicit: this.model };
	}
}
