import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-generate-column-shallow',
	templateUrl: 'example-generate-column-shallow.component.html',
	styleUrls: ['example-generate-column-shallow.component.scss'],
	providers: [DataService]
})
export class ExampleGenerateColumnShallowComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}