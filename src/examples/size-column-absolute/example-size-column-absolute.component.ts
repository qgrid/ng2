 import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-size-column-absolute',
	templateUrl: 'example-size-column-absolute.component.html',
	styleUrls: ['example-size-column-absolute.component.scss'],
	providers: [DataService]
})
export class ExampleSizeColumnAbsoluteComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}