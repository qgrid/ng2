import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-group-row-edit',
	templateUrl: 'example-group-row-edit.component.html',
	styleUrls: ['example-group-row-edit.component.scss'],
	providers: [DataService]
})
export class ExampleGroupRowEditComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}