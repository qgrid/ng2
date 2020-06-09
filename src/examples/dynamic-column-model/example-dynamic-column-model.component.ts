import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GridModel, Grid } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'dynamic-column-model',
	'Table can be created by adding columns and groups using UI buttons'
];

@Component({
	selector: 'example-dynamic-column-model',
	templateUrl: 'example-dynamic-column-model.component.html',
	styleUrls: ['example-dynamic-column-model.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDynamicColumnModelComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

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

		const dataState = this.gridModel.data();
		const columns = dataState.columns.slice();
		const rows = dataState.rows.slice();

		if (side === 'left') {
			columns.unshift(column);
		} else if (side === 'right') {
			columns.push(column);
		} else {
			const middlePos = columns.length % 2 === 0
				? columns.length / 2
				: Math.floor(columns.length / 2);
			columns.splice(middlePos, 0, column);
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
				key: `${groupId}Child${i}`,
				path: `${groupId}.child${i}`,
				title: `child - ${groupId} - ${i}`,
				value: () => `value - ${i}`
			});
		}
		const groupColumn = {
			type: 'cohort',
			key: groupId,
			children: childColumns,
			title: `group - ${groupId}`
		};

		const dataState = this.gridModel.data();
		const columns = dataState.columns.slice();
		columns.push(groupColumn);
		this.gridModel.data({ columns });
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

		for (let i = 0; i < 5; i++) {
			id += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return id;
	}
}
