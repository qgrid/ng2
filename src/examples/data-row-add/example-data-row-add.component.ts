import {Component, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {DataService, Human} from '../data.service';
import {Observable} from 'rxjs';
import {GridComponent, Command, Grid} from 'ng2-qgrid';

@Component({
	selector: 'example-data-row-add',
	templateUrl: 'example-data-row-add.component.html',
	styleUrls: ['example-data-row-add.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDataRowAddComponent {

	static id = 'data-row-add';

	@ViewChild(GridComponent) grid: GridComponent;
	rows: Observable<Human[]>;

	addRow = new Command({
		execute: () => {
			const {model} = this.grid;

			const atom = new Human();
			const rows = Array.from(model.data().rows).concat([atom]);
			model.data({rows});

			// focus last row, second column
			const service = this.qgrid.service(model);
			service.focus(rows.length - 1);
		},
	});


	constructor(dataService: DataService, private qgrid: Grid) {
		this.rows = dataService.getPeople();
	}

}
