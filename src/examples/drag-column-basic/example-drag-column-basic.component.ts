import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-drag-column-basic',
	templateUrl: 'example-drag-column-basic.component.html',
	styleUrls: ['example-drag-column-basic.component.scss'],
	providers: [DataService]
})
export class ExampleDragColumnBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}