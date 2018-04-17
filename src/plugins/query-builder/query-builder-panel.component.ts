import { Component, Optional, Output, EventEmitter, OnInit } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { Command } from 'ng2-qgrid/core/command/command';
import { clone } from 'ng2-qgrid/core/utility/index';
import { QueryBuilderService } from './query-builder.service';
import { WhereSchema } from './schema/where.schema';
import { convert } from './schema/converter';
import { PluginComponent } from '../plugin.component';
import { SerializationService } from '../expression-builder/serialization.service';
import { INodeSchema } from '../expression-builder/model/node.schema';
import { Node } from '../expression-builder/model/node';
import { EbNodeService } from '../expression-builder/eb-node.service';
import { EbNodeComponent } from '../expression-builder/eb-node.component';

@Component({
	selector: 'q-grid-query-builder-panel',
	templateUrl: './query-builder-panel.component.html',
	providers: [QueryBuilderService]
})
export class QueryBuilderPanelComponent extends PluginComponent implements OnInit {
	public node: Node;

	@Output() close = new EventEmitter<any>();

	addGroup = new Command({
		execute: () => {

		},
		canExecute: () => !!this.nodeService.currentNode
	});

	removeGroup = new Command({
		execute: () => {

		},
		canExecute: () => !!this.nodeService.currentNode
	});

	addExpression = new Command({
		execute: () => {

		},
		canExecute: () => !!this.nodeService.currentNode
	});

	removeExpression = new Command({
		execute: () => {

		},
		canExecute: () => true
	});

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
			const schema = new WhereSchema(this.queryService);
			const plan = schema.factory();
			this.node = plan.apply();
		}
	});

	constructor(
		@Optional() root: RootService,
		private queryService: QueryBuilderService,
		private nodeService: EbNodeService) {

		super(root);

		nodeService.currentNodeChange.subscribe(e => {
			const newNode = e.newValue as EbNodeComponent;
			const oldNode = e.oldValue as EbNodeComponent;

			if (newNode) {
				newNode.element.classList.add('q-grid-eb-active');
			}

			if (oldNode) {
				oldNode.element.classList.remove('q-grid-eb-active');
			}
		});
	}

	ngOnInit() {
		super.ngOnInit();

		const schema = new WhereSchema(this.queryService);
		const plan = schema.factory();
		this.node = plan.apply();

		const serializer = new SerializationService();
		const { node } = this.model.queryBuilder();
		if (node) {
			this.node = serializer.deserialize(plan as any as INodeSchema, node);
		}
	}
}
