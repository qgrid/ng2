import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Grid, GridModel } from 'ng2-qgrid';

@Component({
	selector: 'example-visibility-model',
	templateUrl: 'example-visibility-model.component.html',
	styleUrls: ['example-visibility-model.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleVisibilityStateComponent implements AfterViewInit {
	static id = 'visibility-model';

	rows: Observable<Atom[]>;
	gridModel: GridModel;

	constructor(dataService: DataService,
		private qgrid: Grid
	) {
		this.rows = dataService.getAtoms();
		this.gridModel = qgrid.model();
	}

	ngAfterViewInit() {
		this.gridModel.visibility({
			toolbar: {
				bottom: false,
				left: false,
				right: false,
				top: false
			}
		});
	}
}
