import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-size-row-basic',
	templateUrl: 'example-size-row-basic.component.html',
	styleUrls: ['example-size-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleSizeRowBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}