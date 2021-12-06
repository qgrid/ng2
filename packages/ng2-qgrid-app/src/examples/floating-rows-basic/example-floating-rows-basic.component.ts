import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { GridModel, Grid } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'floating-rows-basic',
	'Rows can be freezed (freezed rows remain on the top, when grid is scrolled)'
];

@Component({
	selector: 'example-floating-rows-basic',
	templateUrl: 'example-floating-rows-basic.component.html',
	styleUrls: ['example-floating-rows-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFloatingRowsBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getAtoms()
			.subscribe(rows => {
				this.gridModel.data({ rows });
				this.gridModel.row({
					pinTop: [rows[0], rows[1]],
					pinBottom: [rows[rows.length - 1]]
				});
			});
	}
}
