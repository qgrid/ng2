import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-look-people-model',
	templateUrl: 'example-look-people-model.component.html',
	styleUrls: ['example-look-people-model.component.scss'],
	providers: [DataService]
})
export class ExampleLookPeopleModelComponent {
	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getPeople()
			.subscribe(rows => this.gridModel.data({ rows }));
	}
}