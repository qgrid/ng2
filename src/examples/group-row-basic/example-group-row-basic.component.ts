import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-group-row-basic',
	templateUrl: 'example-group-row-basic.component.html',
	styleUrls: ['example-group-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleGroupRowBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}