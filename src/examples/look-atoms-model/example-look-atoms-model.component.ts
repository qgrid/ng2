import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-look-atoms-model',
	templateUrl: 'example-look-atoms-model.component.html',
	styleUrls: ['example-look-atoms-model.component.scss'],
	providers: [DataService]
})
export class ExampleLookAtomsModelComponent {
	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getAtoms()
			.subscribe(rows => this.gridModel.data({ rows }));
	}
}