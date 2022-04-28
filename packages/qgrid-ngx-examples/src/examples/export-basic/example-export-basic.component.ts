import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Grid, GridModel } from 'ng2-qgrid';
import { Atom, DataService } from '../data.service';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXAMPLE_TAGS = ['export-basic', 'Table data can be exported in different formates, using UI buttons'];

@Component({
	selector: 'example-export-basic',
	templateUrl: 'example-export-basic.component.html',
	styleUrls: ['example-export-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleExportBasicComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;
	gridModel: GridModel;

	constructor(dataService: DataService,
		private qgrid: Grid,
	) {
		this.rows = dataService.getAtoms();
		this.gridModel = qgrid.model();
	}

	ngAfterViewInit() {
		this.gridModel.plugin({
			imports: {
				'fileSaver': fileSaver,
				'xlsx': XLSX,
			},
		});
	}
}
