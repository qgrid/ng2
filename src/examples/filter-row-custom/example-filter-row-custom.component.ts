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

	filter(value: string) {
		const { model } = this.myGrid;
		value = value.toLocaleLowerCase();
		model.filter({
			match: () => row => row.name.toLowerCase().indexOf(value) >= 0
		});
	}
}
