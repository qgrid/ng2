import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-look-atoms-model',
	templateUrl: 'example-look-atoms-model.component.html',
	styleUrls: ['example-look-atoms-model.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleLookAtomsModelComponent {
	static id = 'look-atoms-model';

	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getAtoms()
			.subscribe(rows => this.gridModel.data({ rows }));
	}
}
