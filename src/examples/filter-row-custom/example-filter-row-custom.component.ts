import { Component, ViewChild } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-filter-row-custom',
	templateUrl: 'example-filter-row-custom.component.html',
	styleUrls: ['example-filter-row-custom.component.scss'],
	providers: [DataService]
})
export class ExampleFilterRowCustomComponent {
	@ViewChild(GridComponent) myGrid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	search = {
		name: '',
		phase: ''
	  };
	  

	filter(name: string, value: string) {
	this.search[name] = value;
	const { model} = this.myGrid;

	const predicate = Object
		.keys(this.search)
		.reduce((memo: (x: any) => boolean, key) => {
		const searchText = this.search[key].toLowerCase();
		if (searchText) {
			return row => memo(row) && ('' + row[key]).toLowerCase().indexOf(searchText) >= 0;
		}

		return memo;
		}, x => true);

		model.filter({
			match: () => predicate
		});
	}
	
	/* filter(value: string) {
		const { model } = this.myGrid;
		value = value.toLocaleLowerCase();
		model.filter({
			match: () => row => row.name.toLowerCase().indexOf(value) >= 0
		});
	} */
}
