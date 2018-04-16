import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Line} from './model/line';
import {Node} from './model/node';
import {Watcher} from './watch';

@Component({
	selector: 'q-grid-eb-expression',
	templateUrl: './eb-expression.component.html'
})
export class EbExpressionComponent implements OnInit, DoCheck {
	private watchers: Watcher[];
	@Input() public node: Node;
	@Input() public line: Line;
	@Input() public model: any;

	context: any;

	ngOnInit() {
		const $watch = this.model.$watch || {};

		this.context = {$implicit: this.model, node: this.node, line: this.line};
		this.watchers = Object.keys($watch).map(key => new Watcher(this.model, key, $watch[key], [this.node, this.line]));
	}

	ngDoCheck() {
		this.watchers.forEach(w => w.detect());
	}
}
