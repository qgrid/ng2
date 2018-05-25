import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-selection-row-basic',
	templateUrl: 'example-selection-row-basic.component.html',
	styleUrls: ['example-selection-row-basic.component.css'],
	providers: [DataService]
})
export class ExampleSelectionRowBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}