import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-destroy-grid-model',
	templateUrl: 'example-destroy-grid-model.component.html',
	styleUrls: ['example-destroy-grid-model.component.scss'],
	providers: [DataService]
})
export class ExampleDestroyGridModelComponent {
	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getPeople()
			.subscribe(rows => this.gridModel.data({ rows }));
	}
}