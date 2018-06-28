import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { Atom, DataService } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
	selector: 'example-export-basic',
	templateUrl: 'example-export-basic.component.html',
	styleUrls: [ 'example-export-basic.component.scss' ],
	providers: [ DataService ]
})
export class ExampleExportBasicComponent implements AfterViewInit {
	@ViewChild(GridComponent) myGrid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		this.myGrid.model.plugin({
			imports: {
				'fileSaver': fileSaver,
				'xlsx': XLSX
			}
		});
	}
}
