import { Component, Optional, Output, EventEmitter, OnInit } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { Node } from '../expression-builder/model/node';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';

@Component({
	selector: 'q-grid-query-builder',
	templateUrl: './query-builder.component.html'
})
export class QueryBuilderComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService) {
		super(root);
	}

	onReady() {
		const action =
			new Action(
				new Command(),
				'Query Builder',
				'filter'
			);

		action.templateUrl = 'plugin-query-builder.tpl.html';

		this.model.action({
			items: Composite.list([[action], this.model.action().items])
		});
	}
}
