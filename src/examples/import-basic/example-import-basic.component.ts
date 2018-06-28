import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

import { DataService, Atom } from '../data.service';
import { GridComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-import-basic',
	templateUrl: 'example-import-basic.component.html',
	styleUrls: [ 'example-import-basic.component.scss' ],
	providers: [ DataService ]
})
export class ExampleImportBasicComponent implements AfterViewInit {
	@ViewChild(GridComponent) myGrid: GridComponent;
	rows: Observable<Atom[]> = of([]);

	constructor(dataService: DataService) {
	}

	ngAfterViewInit() {
		this.myGrid.model.plugin({
			imports: {
				'xlsx': XLSX
			}
		});
	}
}
