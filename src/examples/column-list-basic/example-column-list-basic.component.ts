import { Component } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-column-list-basic',
	templateUrl: 'example-column-list-basic.component.html',
	styleUrls: ['example-column-list-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnListBasicComponent {
	rows: Observable<Human[]>;
	group = '';

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}