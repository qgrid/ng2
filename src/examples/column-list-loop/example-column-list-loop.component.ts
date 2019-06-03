import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-column-list-loop',
	templateUrl: 'example-column-list-loop.component.html',
	styleUrls: ['example-column-list-loop.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnListLoopComponent {
	static id = 'column-list-loop';

	rows: Observable<Atom[]>;

	columns = [
		{
			key: 'number',
			title: 'Number'
		},
		{
			key: 'symbol',
			title: 'Symbol'
		},
		{
			key: 'name',
			title: 'Name'
		},
		{
			key: 'appearance',
			title: 'Appearance'
		}
	];

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
