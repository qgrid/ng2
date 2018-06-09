import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-sort-row-basic',
	templateUrl: 'example-sort-row-basic.component.html',
	styleUrls: ['example-sort-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleSortRowBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}