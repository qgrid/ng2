import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-select-cell-basic',
	templateUrl: 'example-select-cell-basic.component.html',
	styleUrls: ['example-select-cell-basic.component.scss'],
	providers: [DataService]
})
export class ExampleSelectCellBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}