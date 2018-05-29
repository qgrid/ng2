import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-look-people-basic',
	templateUrl: 'example-look-people-basic.component.html',
	styleUrls: ['example-look-people-basic.component.scss'],
	providers: [DataService]
})
export class ExampleLookPeopleBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}