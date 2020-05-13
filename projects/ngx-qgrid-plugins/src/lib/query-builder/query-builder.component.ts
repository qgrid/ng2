import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Command } from '@qgrid/core/command/command';
import { Action } from '@qgrid/core/action/action';
import { Composite } from '@qgrid/core/infrastructure/composite';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-query-builder',
	templateUrl: './query-builder.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryBuilderComponent implements OnInit {
	context: { $implicit: QueryBuilderComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin
		) {
	}

	ngOnInit() {
		const { model, disposable } = this.plugin;
		const action =
			new Action(
				new Command(),
				'Query Builder',
				'filter'
			);

		action.templateUrl = 'plugin-query-builder.tpl.html';
		action.id = 'query-builder';

		const items =  Composite.list([model.action().items, [action]]);
		model.action({ items }, { source: 'query-builder.component' });

		disposable.add(() => {
			const notQBItems = model.action().items.filter(x => x.id !== action.id);
			model.action({ items: notQBItems }, { source: 'query-builder.component' });
		});
	}
}
