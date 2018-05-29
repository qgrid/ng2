import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-drag-row-basic',
	templateUrl: 'example-drag-row-basic.component.html',
	styleUrls: ['example-drag-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleDragRowBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}