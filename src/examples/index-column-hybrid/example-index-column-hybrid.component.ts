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
							title: '[js 3]Name',
							index: 3
						},
						{
							key: 'source',
							title: '[js 2]Source',
							index: 2
						}, {
							key: 'melt',
							title: '[js 8]Melt',
							index: 8
						},
						{
							key: 'mass',
							title: '[js no index]Mass',
						},
						{
							key: 'boil',
							title: '[js 0]Boil',
							index: 0
						},
					]
				});
			});
	}
}