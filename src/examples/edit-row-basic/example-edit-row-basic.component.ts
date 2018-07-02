import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-edit-row-basic',
	templateUrl: 'example-edit-row-basic.component.html',
	styleUrls: ['example-edit-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleEditRowBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}