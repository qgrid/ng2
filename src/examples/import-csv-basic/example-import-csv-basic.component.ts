import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Command } from 'ng2-qgrid';

import { DataService, Atom } from '../data.service';

@Component({
	selector: 'example-import-csv-basic',
	templateUrl: 'example-import-csv-basic.component.html',
	styleUrls: [ 'example-import-csv-basic.component.scss' ],
	providers: [ DataService ]
})
export class ExampleImportCsvBasicComponent {
	rows: Observable<Atom[]> = of([]);
	importData: Command;

	constructor(dataService: DataService) {
		this.importData = new Command({
			execute: () => {
				this.rows = dataService.getAtoms();
			},
			shortcut: 'ctrl+d'
		});
	}
}

