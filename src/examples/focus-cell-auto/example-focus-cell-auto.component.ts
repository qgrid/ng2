import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-focus-cell-auto',
	templateUrl: 'example-focus-cell-auto.component.html',
	styleUrls: ['example-focus-cell-auto.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFocusCellAutoComponent {
	static id = 'focus-cell-auto';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
