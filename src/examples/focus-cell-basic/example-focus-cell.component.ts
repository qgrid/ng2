import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-focus-cell',
	templateUrl: 'example-focus-cell.component.html',
	styleUrls: ['example-focus-cell.component.scss'],
	providers: [DataService]
})
export class ExampleFocusCellComponent {
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