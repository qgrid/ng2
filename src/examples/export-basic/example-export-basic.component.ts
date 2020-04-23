import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';
import { Atom, DataService } from '../data.service';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
	selector: 'example-export-basic',
	templateUrl: 'example-export-basic.component.html',
	styleUrls: ['example-export-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleExportBasicComponent implements AfterViewInit {
	static id = 'export-basic';

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		this.grid.model.plugin({
			imports: {
				'fileSaver': fileSaver,
				'xlsx': XLSX
			}
		});
	}
}
