import { Component } from '@angular/core';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-dynamic-column-model',
	templateUrl: 'example-dynamic-column-model.component.html',
	styleUrls: ['example-dynamic-column-model.component.scss']
})
export class ExampleDynamicColumnModelComponent {
	gridModel: GridModel;

	constructor(private qgrid: Grid) {
		this.gridModel = qgrid.model();
		this.reset();
	}

	addColumn(side) {
		const id = this.getRandomId();
		const column = {
			type: 'text',
			key: id,
			title: `${side} - ${id}`
		};

		const data = this.gridModel.data();
		const columns = data.columns.slice()
		const rows = data.rows.slice();
		if (side === 'left') {
			columns.unshift(column);
		} else {
			columns.push(column);
		}
		rows.forEach(r => r[id] = `value - ${id}`);
		this.gridModel.data({ columns, rows });
	}

	addGroup() {
		const groupId = this.getRandomId();
		const childColumns = [];
		for (let i = 0; i < 3; i++) {
			childColumns.push({
				type: 'text',
				key: `child${i}`,
				path: `${groupId}.child${i}`,
				title: `child - ${groupId} - ${i}`
			});
		}
		const groupColumn = {
			type: 'cohort',
			key: groupId,
			children: childColumns,
			title: `group - ${groupId}`
		};

		const data = this.gridModel.data();
		const columns = data.columns.slice()
		const rows = data.rows.slice();
		columns.push(groupColumn);
		rows.forEach(r => {
			r[groupId] = {};
			childColumns.forEach((c, i) => r[groupId][c.key] = `value - ${i}` );
		});
		this.gridModel.data({ columns, rows });
	}

	reset() {
		this.gridModel.data({
			columns: [],
			rows: new Array(100).fill({})
		});
	}

	private getRandomId() {
		let id = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

		for (var i = 0; i < 5; i++) {
			id += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return id;
	}
}
