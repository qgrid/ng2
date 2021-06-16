import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridComponent, Grid, GridModel } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'filter-row-custom',
	'Table data can be filtered using custom filter inputs'
];

@Component({
	selector: 'example-filter-row-custom',
	templateUrl: 'example-filter-row-custom.component.html',
	styleUrls: ['example-filter-row-custom.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFilterRowCustomComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	@ViewChild(GridComponent, { static: true }) myGrid: GridComponent;
	rows: Observable<Atom[]>;
	gridModel: GridModel = this.qgrid.model();

	search = {
		name: '',
		phase: ''
	};

	constructor(dataService: DataService, private qgrid: Grid) {
		this.rows = dataService.getAtoms();
	}

	filter(name: string, value: string) {
		this.search[name] = value;

		const custom = Object
			.keys(this.search)
			.reduce((memo: (x: any) => boolean, key) => {
				const searchText = this.search[key].toLowerCase();
				if (searchText) {
					return row => memo(row) && ('' + row[key]).toLowerCase().indexOf(searchText) >= 0;
				}

				return memo;
			}, x => true);

		this.gridModel.filter({
			custom
		});
	}
}
