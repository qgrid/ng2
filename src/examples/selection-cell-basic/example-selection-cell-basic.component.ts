import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-selection-cell-basic',
	templateUrl: 'example-selection-cell-basic.component.html',
	styleUrls: ['example-selection-cell-basic.component.css'],
	providers: [DataService]
})
export class ExampleSelectionCellBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}