import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-destroy-grid-basic',
	templateUrl: 'example-destroy-grid-basic.component.html',
	styleUrls: ['example-destroy-grid-basic.component.scss'],
	providers: [DataService]
})
export class ExampleDestroyGridBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}