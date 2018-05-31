import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-select-column-basic',
	templateUrl: 'example-select-column-basic.component.html',
	styleUrls: ['example-select-column-basic.component.scss'],
	providers: [DataService]
})
export class ExampleSelectColumnBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}