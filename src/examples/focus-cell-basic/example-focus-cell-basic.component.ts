import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-focus-cell-basic',
	templateUrl: 'example-focus-cell-basic.component.html',
	styleUrls: ['example-focus-cell-basic.component.scss'],
	providers: [DataService]
})
export class ExampleFocusCellBasicComponent {
	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getAtoms()
			.subscribe(rows => {
				this.gridModel.data({ rows });

				const gridService = qgrid.service(this.gridModel);
				gridService.focus(1, 2);
			});
	}
}