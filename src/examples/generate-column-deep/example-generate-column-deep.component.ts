import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-generate-column-deep',
	templateUrl: 'example-generate-column-deep.component.html',
	styleUrls: ['example-generate-column-deep.component.scss'],
	providers: [DataService]
})
export class ExampleGenerateColumnDeepComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}