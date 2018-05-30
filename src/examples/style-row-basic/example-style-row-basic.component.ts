import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService, Atom } from '../data.service';
import { StyleRowContext } from 'ng2-qgrid';

@Component({
	selector: 'example-style-row-basic',
	templateUrl: 'example-style-row-basic.component.html',
	styleUrls: ['example-style-row-basic.component.scss'],
	providers: [DataService]
})
export class ExampleStyleRowBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	styleRow(row: Atom, context: StyleRowContext) {
		context.class(row.symbol, { 'background-color': `#${row.color}` })
	}
}