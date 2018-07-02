import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-floating-rows-basic',
	templateUrl: 'example-floating-rows-basic.component.html',
	styleUrls: ['example-floating-rows-basic.component.scss'],
	providers: [DataService]
})
export class ExampleFloatingRowsBasicComponent {
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
