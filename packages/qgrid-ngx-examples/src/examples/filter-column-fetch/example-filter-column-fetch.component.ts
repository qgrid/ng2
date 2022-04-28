import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FetchContext, Grid, GridModel } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['filter-column-fetch', 'Column filter value can be loaded from server'];

@Component({
	selector: 'example-filter-column-fetch',
	templateUrl: 'example-filter-column-fetch.component.html',
	styleUrls: ['example-filter-column-fetch.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleFilterColumnFetchComponent implements AfterViewInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;
	gridModel: GridModel;

	constructor(private dataService: DataService,
		private qgrid: Grid,
	) {
		this.rows = dataService.getAtoms();
		this.gridModel = qgrid.model();
	}

	ngAfterViewInit() {
		this.gridModel.filter({
			fetch: (key: string, context: FetchContext) =>
				this.dataService
					.getAtoms()
					.pipe(
						map(atoms => {
							const { search, value, take, skip } = context;
							const columnSearch = search.toLowerCase();

							const columnData = atoms.map(value);
							const filteredData = columnSearch
								? columnData.filter(x => ('' + x).toLowerCase().indexOf(columnSearch) >= 0)
								: columnData;

							filteredData.sort();
							return filteredData.slice(skip, skip + take);
						})),
		});
	}
}
