import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-plugin-grid-basic',
	templateUrl: 'example-plugin-grid-basic.component.html',
	styleUrls: ['example-plugin-grid-basic.component.scss'],
	providers: [DataService]
})
export class ExamplePluginGridBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}