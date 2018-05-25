import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-group-row-basic',
	templateUrl: 'example-group-row-basic.component.html',
	styleUrls: ['example-group-row-basic.component.css'],
	providers: [DataService]
})
export class ExampleGroupRowBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}