import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Grid, GridModel, Command, Node } from 'ng2-qgrid';

@Component({
	selector: 'example-hierarchy-browser-basic',
	templateUrl: 'example-hierarchy-browser-basic.component.html',
	styleUrls: ['example-hierarchy-browser-basic.component.scss'],
	providers: [DataService]
})
export class ExampleHierarchyBrowserBasicComponent {
	gridModel: GridModel;

	constructor(qgrid: Grid) {
		this.gridModel = qgrid.model();

		const root = new Node('$root', 0);
		(root as any).isVisited = false;

		const tree = [root];
		const service = qgrid.service(this.gridModel);
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
					qgrid.pipe.view
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

							service.invalidate();
						}, 500);
					}
				})
			})
			.selection({
				mode: 'multiple',
				unit: 'row',
				area: 'custom',
				key: {
					row: function row(node) {
						return node.key;
					}
				}
			});
	}
}
