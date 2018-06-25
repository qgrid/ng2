import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel, Grid } from 'ng2-qgrid';

@Component({
	selector: 'example-define-column-async',
	templateUrl: 'example-define-column-async.component.html',
	styleUrls: ['example-define-column-async.component.scss'],
	providers: [DataService]
})
export class ExampleDefineColumnAsyncComponent {
	gridModel: GridModel;

	constructor(private dataService: DataService, qgrid: Grid) {
		this.gridModel = qgrid.model();
	}

	ngOnInit() {
		this.dataService
			.getAtoms()
			.subscribe(rows => {
				this.gridModel.data({ rows })

				setTimeout(() => {
					this.gridModel.data({
						columns: [{
							key: 'source',
							width: 300
						},
						{
							key: 'symbol+name',
							label: row => `[${row.symbol}]${row.name}`,
							value: row => row.symbol,
							width: 150
						}]
					});
				}, 1000);
			});
	}
}