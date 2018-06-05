import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-index-column-model',
	templateUrl: 'example-index-column-model.component.html',
	styleUrls: ['example-index-column-model.component.scss'],
	providers: [DataService]
})
export class ExampleIndexColumnModelComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}