import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-define-column-hybrid',
	templateUrl: 'example-define-column-hybrid.component.html',
	styleUrls: ['example-define-column-hybrid.component.scss'],
	providers: [DataService]
})
export class ExampleDefineColumnHybridComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}