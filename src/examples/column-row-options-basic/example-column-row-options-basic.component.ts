import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-row-options-basic',
	templateUrl: 'example-column-row-options-basic.component.html',
	styleUrls: ['example-column-row-options-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnRowOptionsBasicComponent {
	rows: Observable<Atom[]>;
	rowActions = [
		new Action(
			new Command<{ row: Atom }>({
				execute: cell => window.open(cell.row.source, '_blank')
			}),
			'Goto Wiki',
			'link'
		)
	];

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}