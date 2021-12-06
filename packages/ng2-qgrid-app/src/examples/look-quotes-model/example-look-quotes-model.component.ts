import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-look-quotes-model',
	templateUrl: 'example-look-quotes-model.component.html',
	styleUrls: ['example-look-quotes-model.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleLookQuotesModelComponent {
	static id = 'look-quotes-model';

	gridModel: GridModel;

	constructor(dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();

		dataService
			.getQuotes()
			.subscribe(rows => this.gridModel.data({ rows }));
	}
}
