 import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-size-column-full',
	templateUrl: 'example-size-column-full.component.html',
	styleUrls: ['example-size-column-full.component.scss'],
	providers: [DataService]
})
export class ExampleSizeColumnFullComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}