import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-look-quotes-model',
	templateUrl: 'example-look-quotes-model.component.html',
	styleUrls: ['example-look-quotes-model.component.scss'],
	providers: [DataService]
})
export class ExampleLookQuotesModelComponent {
	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getQuotes()
			.subscribe(rows => this.gridModel.data({ rows }));
	}
}