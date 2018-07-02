import { Component, Optional, Output, EventEmitter, OnInit } from '@angular/core';
import { Node } from '../expression-builder/model/node';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-query-builder',
	templateUrl: './query-builder.component.html',
	providers: [PluginService]
})
export class QueryBuilderComponent implements OnInit {
	context: { $implicit: QueryBuilderComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService) {
	}

	ngOnInit() {
		const action =
			new Action(
				new Command(),
				'Query Builder',
				'filter'
			);

		action.templateUrl = 'plugin-query-builder.tpl.html';

		this.plugin.model.action({
			items: Composite.list([[action], this.plugin.model.action().items])
		}, {
				source: 'query-builder.component'
			});
	}
}
