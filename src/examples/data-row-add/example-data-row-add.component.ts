import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, Command, Grid } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'data-row-add',
	'New row can be added using UI button "add row"'
];

@Component({
	selector: 'example-data-row-add',
	templateUrl: 'example-data-row-add.component.html',
	styleUrls: ['example-data-row-add.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDataRowAddComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	@ViewChild(GridComponent, { static: true }) grid: GridComponent;
	rows: Observable<Human[]>;

	addRow = new Command({
		execute: () => {
			const { model } = this.grid;

			const human: Human = {
				id: -1,
				contact: { email: [] },
				password: '',
				comment: '',
				likes: [],
				gender: 'male',
				birthday: '',
				memberSince: '',
				name: {
					first: '',
					last: '',
				}
			};

			const rows = Array.from(model.data().rows).concat([human]);
			model.data({ rows });

			// focus last row, second column
			const service = this.qgrid.service(model);
			service.focus(rows.length - 1);
		}
	});


	constructor(dataService: DataService, private qgrid: Grid) {
		this.rows = dataService.getPeople();
	}

	ngAfterViewInit() {
		const { model } = this.grid;
		model.edit({
			mode: 'cell'
		});
	}
}
