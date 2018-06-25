import { Component } from '@angular/core';

import { Atom, DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-export-csv-basic',
	templateUrl: 'example-export-csv-basic.component.html',
	styleUrls: [ 'example-export-csv-basic.component.scss' ],
	providers: [ DataService ]
})
export class ExampleExportCsvBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}

