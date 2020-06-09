import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';
import { Atom, DataService } from '../data.service';
import * as fileSaver from 'file-saver';

const EXAMPLE_TAGS = [
	'export-csv',
	'Table data can be exported in csv, using UI button'
];

@Component({
	selector: 'example-export-csv',
	templateUrl: 'example-export-csv.component.html',
	styleUrls: ['example-export-csv.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleExportCsvComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		this.grid.model.plugin({
			imports: {
				'fileSaver': fileSaver
			}
		});
	}
}
