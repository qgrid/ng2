import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

import { DataService, Atom } from '../data.service';
import { Grid, GridModel } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['import-basic', 'Table data can be imported from file'];

@Component({
	selector: 'example-import-basic',
	templateUrl: 'example-import-basic.component.html',
	styleUrls: ['example-import-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleImportBasicComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]> = of([]);
	gridModel: GridModel;

	constructor(private qgrid: Grid) {
		this.gridModel = qgrid.model();
	}
	ngAfterViewInit() {
		this.gridModel.plugin({
			imports: {
				'xlsx': XLSX,
			},
		});
	}
}
