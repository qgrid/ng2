import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-select-row-basic',
	templateUrl: 'example-select-row-basic.component.html',
	styleUrls: ['example-select-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleSelectRowBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}