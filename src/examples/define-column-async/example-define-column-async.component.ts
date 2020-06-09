import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { GridModel, Grid } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'define-column-async',
	'Table content is loaded asynchronously'
];

@Component({
	selector: 'example-define-column-async',
	templateUrl: 'example-define-column-async.component.html',
	styleUrls: ['example-define-column-async.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDefineColumnAsyncComponent implements OnInit {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	gridModel: GridModel;

	constructor(private dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();
	}

	ngOnInit() {
		this.dataService
			.getAtoms()
			.subscribe(rows => {
				this.gridModel.data({ rows });

				setTimeout(() => {
					this.gridModel.data({
						columns: [
							{
								key: 'source',
								width: 300
							},
							{
								key: 'symbol+name',
								label: row => `[${row.symbol}]${row.name}`,
								value: row => row.symbol,
								width: 150
							}
						]
					});
				}, 1000);
			});
	}
}
