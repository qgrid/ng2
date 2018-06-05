import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-index-column-hybrid',
	templateUrl: 'example-index-column-hybrid.component.html',
	styleUrls: ['example-index-column-hybrid.component.scss'],
	providers: [DataService]
})
export class ExampleIndexColumnHybridComponent {
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
							key: 'name',
							title: 'js should not be 3]Name',
							index: 3
						},
						{
							key: 'melt',
							title: '[js 10]Melt',
							index: 10
						},
						{
							key: 'mass',
							title: '[js 0]Mass',
							index: 0
						},
						{
							key: 'boil',
							title: '[js 2]Boil',
							index: 2
						},
					]
				});
			});
	}
}