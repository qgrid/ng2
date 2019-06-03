import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-row-options-basic',
	templateUrl: 'example-column-row-options-basic.component.html',
	styleUrls: ['example-column-row-options-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnRowOptionsBasicComponent {
	static id = 'column-row-options-basic';

	rows: Observable<Atom[]>;
	rowActions = [
		new Action(
			new Command<{ row: Atom }>({
				execute: cell => window.open(cell.row.source, '_blank'),
				shortcut: 'alt+g'
			}),
			'Goto Wiki',
			'link'
		),
		new Action(
			new Command(),
			'---'
		),
		new Action(
			new Command({
				execute: () => alert('hello world'),
				shortcut: 'alt+h'
			}),
			'Hello World'
		)
	];

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
