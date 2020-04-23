import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent } from 'ng2-qgrid';

@Component({
	selector: 'example-look-atoms-id',
	templateUrl: 'example-look-atoms-id.component.html',
	styleUrls: ['example-look-atoms-id.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleLookAtomsIdComponent implements AfterViewInit {
	static id = 'look-atoms-id';

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	ngAfterViewInit() {
		const { model } = this.grid;
		model.dataChanged.watch((e, off) => {
			if (e.hasChanges('columns')) {
				model.sort({
					by: ['number']
				});

				off();
			}
		});
	}
}
