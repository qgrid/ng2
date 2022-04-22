import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Action, Command, Composite } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-query-builder',
	templateUrl: './query-builder.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryBuilderComponent implements OnInit {
	context: { $implicit: QueryBuilderComponent } = {
		$implicit: this,
	};

	constructor(
		private plugin: GridPlugin,
	) {
	}

	ngOnInit() {
		const { model, disposable } = this.plugin;
		const action =
			new Action(
				new Command(),
				'Query Builder',
				'filter',
			);

		action.templateUrl = 'plugin-query-builder.tpl.html';

		const items = Composite.list([model.action().items, [action]]);
		model.action({
			items,
		}, {
			source: 'query-builder.component',
		});

		disposable.add(() => {
			model.action({
				items: model
					.action()
					.items
					.filter(x => x !== action),
			}, {
				source: 'query-builder.component',
			});
		});
	}
}
