import { Component, Optional, Output, EventEmitter, OnInit } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { Command } from 'ng2-qgrid/core/command/command';
import { PluginComponent } from '../plugin.component';
import { Node } from '../expression-builder/model/node';
import { QueryBuilderService } from './query-builder.service';
import { WhereSchema } from './schema/where.schema';
import { SerializationService } from '../expression-builder/serialization.service';
import { INodeSchema } from 'ng2-qgrid/plugins/expression-builder/model/node.schema';
import { convert } from './schema/converter';
import { clone } from 'ng2-qgrid/core/utility/index';

@Component({
	selector: 'q-grid-query-builder-panel',
	templateUrl: './query-builder-panel.component.html',
	providers: [QueryBuilderService]
})
export class QueryBuilderPanelComponent extends PluginComponent implements OnInit {
	public node: Node;

	@Output() close = new EventEmitter<any>();

	submit = new Command({
		source: 'query-builder.component',
		execute: () => {
			const serializer = new SerializationService();
			const node = serializer.serialize(this.node);

			const by = clone(this.model.filter().by);
			by.expression = convert(node);

			this.model.filter({ by });
			this.model.queryBuilder({ node: by.expression ? node : null });

			this.close.emit();
		}
	});

	cancel = new Command({
		source: 'query-builder.component',
		execute: () => {
			this.close.emit();
		}
	});

	reset = new Command({
		source: 'query-builder.component',
		execute: () => {
			const schema = new WhereSchema(this.service);
			const plan = schema.factory();
			this.node = plan.apply();
		}
	});

	constructor(
		@Optional() root: RootService,
		private service: QueryBuilderService) {

		super(root);
	}

	ngOnInit() {
		super.ngOnInit();

		const schema = new WhereSchema(this.service);
		const plan = schema.factory();
		this.node = plan.apply();

		const serializer = new SerializationService();
		const { node } = this.model.queryBuilder();
		if (node) {
			this.node = serializer.deserialize(schema as any as INodeSchema, node);
		}
	}
}
