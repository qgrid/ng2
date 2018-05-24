import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';


@Component({
	selector: 'example-first-look',
	templateUrl: 'example-first-look.component.html',
	styleUrls: ['example-first-look.component.css'],
	providers: [DataService]
})
export class ExampleFirstLookComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}