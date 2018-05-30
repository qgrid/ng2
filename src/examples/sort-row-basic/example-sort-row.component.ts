import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-sort-row',
	templateUrl: 'example-sort-row.component.html',
	styleUrls: ['example-sort-row.component.scss'],
	providers: [DataService]
})
export class ExampleSortRowComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}