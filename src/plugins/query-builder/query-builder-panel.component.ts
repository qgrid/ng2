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
import { TraverseService } from '../expression-builder/traverse.service';

function findLogicalNode(node: Node) {
	return TraverseService.findUp(node, n => n.id === '#logical');
}

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
			const current = this.nodeService.current;
			const node = findLogicalNode(current);
			node.addChildAfter(node.clone(), current.id === '#condition' && current);
		},
		canExecute: () => !!findLogicalNode(this.nodeService.current)
	});

	addRule = new Command({
		execute: () => {
			const current = this.nodeService.current;
			const node = this.plan.materialize('#condition');
			const logicalNode = findLogicalNode(current);
			logicalNode.addChildAfter(node, current.id === '#condition' && current);
		},
		canExecute: () => !!findLogicalNode(this.nodeService.current)
	});

	remove = new Command({
		execute: () => {
			const current = this.nodeService.current;
			if (current.id === '#logical' && current.level === 1) {
				const children = Array.from(current.children);
				children.forEach(child => child.remove());
			} else {
				const previous = TraverseService.findUpSibling(current);
				this.nodeService.current = previous;
				current.remove();
			}
		},
		canExecute: () => {
			const current = this.nodeService.current;
			return current && (current.id === '#condition' || (current.level > 1 || current.children.length > 0));
		}
	});

	submit = new Command({
		source: 'query-builder.component',
		execute: () => {
			const serializer = new SerializationService();
			const node = serializer.serialize(this.node);

			const by = clone(this.model.filter().by);
			by.$expression = convert(node);

			this.model.filter({ by });
			this.model.queryBuilder({ node: by.$expression ? node : null });

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

	private plan: INodeSchema;

	constructor(
		@Optional() root: RootService,
		public queryService: QueryBuilderService,
		private nodeService: EbNodeService) {

		super(root);

		nodeService.currentChange.subscribe(e => {
			const newNode = nodeService.bag.get(e.newValue as Node);
			const oldNode = nodeService.bag.get(e.oldValue as Node);

			if (oldNode) {
				oldNode.element.classList.remove('q-grid-eb-active');
			}

			if (newNode) {
				newNode.element.classList.add('q-grid-eb-active');
			}
		});
	}

	ngOnInit() {
		super.ngOnInit();

		const schema = new WhereSchema(this.queryService);
		this.plan = schema.factory() as any;
		this.node = this.plan.apply();

		const serializer = new SerializationService();
		const { node } = this.model.queryBuilder();
		if (node) {
			this.node = serializer.deserialize(this.plan, node);
		}

		const root = this.node.children[0];
		this.nodeService.current = root;
	}
}
