import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Grid, GridModel } from 'ng2-qgrid';
import { Node } from 'ng2-qgrid/core/node/node'
import { GridService } from '../../lib/main/grid/grid.service';
import { Command } from 'ng2-qgrid/core/command/command';
import { jobLine } from 'ng2-qgrid/core/services/job.line';

@Component({
	selector: 'example-hierarchy-browser-basic',
	templateUrl: 'example-hierarchy-browser-basic.component.html',
	styleUrls: ['example-hierarchy-browser-basic.component.scss'],
	providers: [DataService]
})
export class ExampleHierarchyBrowserBasicComponent {
	gridModel: GridModel;

	constructor(qgrid: Grid, gridService: GridService,) {
		this.gridModel = qgrid.model();

		const root = new Node('root', 0);
		root.isVisited = false;

		const tree = [root];
		const service = gridService.service(this.gridModel);
		const treePipe = function treePipe(memo, context, next) {
			memo.nodes = tree;
			next(memo);
		};
		const job = new jobLine(500);

		this.gridModel.data({
			pipe: [qgrid.pipe.memo, treePipe, qgrid.pipe.column, qgrid.pipe.view]
		}).group({
			toggle: new Command({
				execute: function execute(node) {
					if (node.isVisited) {
						return;
					}

					node.isVisited = true;
					let length = Math.floor(Math.random() * 9 + 1);
					let level = node.level + 1;
					job(() => {
						node.children = Array.from(new Array(length), function (x, i) {
							let type = Math.floor(Math.random() * 5) < 3 ? 'group' : 'value';
							let child = new Node(type + ' node[' + level + ',' + i + ']', level, type);
							child.isVisited = false;
							return child;
						});

						service.invalidate();
					});
				}
			})
		}).selection({
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
