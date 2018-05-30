import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-define-column-basic',
	templateUrl: 'example-define-column-basic.component.html',
	styleUrls: ['example-define-column-basic.component.scss'],
	providers: [DataService]
})
export class ExampleDefineColumnBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}