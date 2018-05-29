import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-persistence-basic',
	templateUrl: 'example-persistence-basic.component.html',
	styleUrls: ['example-persistence-basic.component.scss'],
	providers: [DataService]
})
export class ExamplePersistenceBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}