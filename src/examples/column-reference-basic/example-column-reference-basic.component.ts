import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command, Grid, GridModel, EditorOptions } from 'ng2-qgrid';

@Component({
	selector: 'example-column-reference-basic',
	templateUrl: 'example-column-reference-basic.component.html',
	styleUrls: ['example-column-reference-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnReferenceBasicComponent {
	rows: Observable<Atom[]>;
	showSamePhaseAtomsOptions: EditorOptions = {
		modelFactory: ({ row }) => {
			const model = this.qgrid.model();
			this.rows.subscribe(atoms => {
				model
					.data({
						rows: atoms.filter(atom => atom.phase === row.phase),
						columns: [{
							key: 'symbol',
							title: 'Symbol',
							canFilter: false
						}, {
							key: 'name',
							title: 'Name',
							canFilter: false
						}]
					})
					.visibility({
						toolbar: {
							top: false,
							bottom: false,
							right: false,
							left: false
						}
					});
			});
			return model;
		}
	};

	constructor(dataService: DataService, private qgrid: Grid) {
		this.rows = dataService.getAtoms();
	}
}