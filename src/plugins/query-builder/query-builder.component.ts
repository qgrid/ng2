import { Component, Optional, Output, EventEmitter, OnInit } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { PluginComponent } from '../plugin.component';
import { Node } from '../expression-builder/model/node';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';

@Component({
	selector: 'q-grid-query-builder',
	template: ''
})
export class QueryBuilderComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService) {
		super(root);
	}

	ngOnInit() {
		super.ngOnInit();

		const actions = [
			new Action(
				new Command(),
				'Query Builder',
				'filter'
			)
		];

		this.model.action({
			items: Composite.list([actions, this.model.action().items])
		});
	}
}
