import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command, Grid, GridModel } from 'ng2-qgrid';

@Component({
	selector: 'example-column-reference-basic',
	templateUrl: 'example-column-reference-basic.component.html',
	styleUrls: ['example-column-reference-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnReferenceBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService, private qgrid: Grid) {
		this.rows = dataService.getAtoms();
	}

	showSamePhaseAtoms(): GridModel {
		const model = this.qgrid.model();
		this.rows.subscribe(rows => model.data({ rows }));
		return model;
	}
}