import { Component, DoCheck, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Line } from './model/line';
import { Node } from './model/node';
import { Watcher } from './digest/watch';

@Component({
	selector: 'q-grid-eb-expression',
	templateUrl: './eb-expression.component.html',
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class EbExpressionComponent implements OnInit, DoCheck {
	private watchers: Watcher[];

	@Input() node: Node;
	@Input() line: Line;
	@Input() model: any;

	context: { $implicit: any, node: Node, line: Line };

	ngOnInit() {
		this.context = { $implicit: this.model, node: this.node, line: this.line };

		const $watch = this.model.$watch;
		if ($watch) {
			this.watchers =
				Object
					.keys($watch)
					.map(key =>
						new Watcher(
							this.model,
							key,
							$watch[key],
							[this.node, this.line])
					);
		}
	}

	ngDoCheck() {
		const ws = this.watchers;
		if (!ws) {
			return;
		}

		for (let i = 0, length = ws.length; i < length; i++) {
			ws[i].detect();
		}
	}
}
