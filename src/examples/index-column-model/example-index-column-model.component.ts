import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-index-column-model',
	templateUrl: 'example-index-column-model.component.html',
	styleUrls: ['example-index-column-model.component.scss'],
	providers: [DataService]
})
export class ExampleIndexColumnModelComponent {
	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getAtoms()
			.subscribe(rows => {
				this.gridModel.data({
					rows,
					columns: [
						{
							key: 'source',
							title: '[3]Wiki',
							type: 'url'
						},
						{
							key: 'symbol',
							title: '[1]Symbol',
							index: 1
						},
						{
							key: 'name',
							title: '[2]Name',
							index: 2
						},
						{
							key: 'number',
							title: '[0]Number',
							index: 0
						},
					]
				});
			});
	}
}