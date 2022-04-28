import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Grid, GridModel, Command } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['edit-cell-basic', 'Cell values can be edited, "Gender" has a custom edit template'];

@Component({
	selector: 'example-edit-cell-basic',
	templateUrl: 'example-edit-cell-basic.component.html',
	styleUrls: ['example-edit-cell-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleEditCellBasicComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows$: Observable<Human[]> = this.dataService.getPeople();
	gridModel: GridModel;

	commit = new Command({
		execute: e => console.log('commit: ' + e.newValue),
	});

	cancel = new Command({
		execute: () => console.log('cancel'),
	});

	constructor(private dataService: DataService,
		private qgrid: Grid,
	) {
		this.gridModel = qgrid.model();
	}

	ngAfterViewInit() {
		this.gridModel.edit({
			cancel: this.cancel,
			commit: this.commit,
		});
	}
}
