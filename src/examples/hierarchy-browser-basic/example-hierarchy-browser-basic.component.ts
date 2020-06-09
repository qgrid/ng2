import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Grid, GridModel, Command, Node } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'hierarchy-browser-basic',
	'Table content is folder tree'
];

@Component({
	selector: 'example-hierarchy-browser-basic',
	templateUrl: 'example-hierarchy-browser-basic.component.html',
	styleUrls: ['example-hierarchy-browser-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleHierarchyBrowserBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	gridModel: GridModel = this.qgrid.model();

	constructor(private qgrid: Grid) {
		const gridService = qgrid.service(this.gridModel);
		const root = new Node('$root', 0);
		(root as any).isVisited = false;

		const tree = [root];
		const treePipe = (memo, context, next) => {
			memo.nodes = tree;
			next(memo);
		};

		this.gridModel
			.data({
				pipe: [
					qgrid.pipe.memo,
					treePipe,
					qgrid.pipe.column,
					qgrid.pipe.view,
					qgrid.pipe.scene
				]
			})
			.group({
				toggle: new Command({
					execute: function execute(node) {
						if (node.isVisited) {
							return;
						}

						node.isVisited = true;
						const length = Math.floor(Math.random() * 9 + 1);
						const level = node.level + 1;
						setTimeout(() => {
							node.children = Array.from(new Array(length), function (x, i) {
								const type = Math.floor(Math.random() * 5) < 3 ? 'group' : 'value';
								const title = type === 'group' ? 'folder' : 'file';
								const child = new Node(title + ' [' + level + ',' + i + '] ', level, type);
								(child as any).isVisited = false;
								return child;
							});

							gridService.invalidate();
						}, 500);
					}
				})
			})
			.selection({
				mode: 'multiple',
				unit: 'row',
				area: 'custom',
				rowKey: node => node.key
			});
	}
}
