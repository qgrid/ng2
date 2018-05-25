import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-grouping-basic',
	templateUrl: 'example-grouping-basic.component.html',
	styleUrls: ['example-grouping-basic.component.css'],
	providers: [DataService]
})
export class ExampleGroupingBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}