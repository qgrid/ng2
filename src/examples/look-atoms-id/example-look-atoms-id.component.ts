import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-look-atoms-id',
	templateUrl: 'example-look-atoms-id.component.html',
	styleUrls: ['example-look-atoms-id.component.scss'],
	providers: [DataService]
})
export class ExampleLookAtomsIdComponent implements AfterViewInit {
	@ViewChild(GridComponent) myGrid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		this.myGrid.model.dataChanged.watch((e, off) => {
			if (e.hasChanges('columns')) {
				this.myGrid.model.sort({
					by: ['number']
				});

				off();
			}
		});
	}
}
