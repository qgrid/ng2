import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';
import { Atom, DataService } from '../data.service';
import * as fileSaver from 'file-saver';

@Component({
	selector: 'example-export-csv',
	templateUrl: 'example-export-csv.component.html',
	styleUrls: ['example-export-csv.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleExportCsvComponent implements AfterViewInit {
	static id = 'export-csv';

	@ViewChild(GridComponent) myGrid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		this.myGrid.model.plugin({
			imports: {
				'fileSaver': fileSaver
			}
		});
	}
}
