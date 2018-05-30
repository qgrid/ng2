import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-manipulate-data-basic',
	templateUrl: 'example-manipulate-data-basic.component.html',
	styleUrls: ['example-manipulate-data-basic.component.scss'],
	providers: [DataService]
})
export class ExampleManipulateDataBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}