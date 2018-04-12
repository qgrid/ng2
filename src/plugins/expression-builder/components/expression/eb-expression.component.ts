import {Component, Input} from '@angular/core';
import {Line} from '../../model/line';
import {Node} from '../../model/node';

@Component({
	selector: '[expression-builder-expression]',
	template: '<div></div>'
})
export class EbExpressionComponent {
	@Input() public node: Node;
	@Input() public line: Line;
	@Input() public expression: any;
}
