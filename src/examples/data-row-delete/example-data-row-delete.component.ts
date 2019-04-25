
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, Command, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-data-row-delete',
	templateUrl: 'example-data-row-delete.component.html',
	styleUrls: ['example-data-row-delete.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDataRowDeleteComponent {
	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Human[]>;

	deleteRow = new Command({
		execute: (row: Human) => {
			const { model } = this.grid;

			const rows = model.data().rows.filter(x => x !== row);
			model.data({ rows });
		}
	});

	constructor(dataService: DataService, private qgrid: Grid) {
		this.rows = dataService.getPeople();
	}
}
