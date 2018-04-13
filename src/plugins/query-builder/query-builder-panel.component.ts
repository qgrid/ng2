import { Component, Optional, Output, EventEmitter, OnInit } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { Command } from 'ng2-qgrid/core/command/command';
import { PluginComponent } from '../plugin.component';
import { Node } from '../expression-builder/model/node';
import { QueryBuilderService } from './query-builder.service';
import { WhereSchema } from './schema/where.schema';

@Component({
	selector: 'q-grid-query-builder-panel',
	templateUrl: './query-builder-panel.component.html',
	providers: [QueryBuilderService, WhereSchema]
})
export class QueryBuilderPanelComponent extends PluginComponent implements OnInit {
	public node: Node;

	@Output() close = new EventEmitter<any>();

	submit = new Command({
		source: 'query-builder.component',
		execute: () => {

		}
	});

	cancel = new Command({
		source: 'query-builder.component',
		execute: () => {

		}
	});

	reset = new Command({
		source: 'query-builder.component',
		execute: () => {
		}
	});

	constructor(
		@Optional() root: RootService,
		private service: QueryBuilderService,
		private whereSchema: WhereSchema) {

		super(root);
	}

	ngOnInit() {
		super.ngOnInit();

		const schema = this.whereSchema.factory();
		this.node = schema.apply();
	}
}
