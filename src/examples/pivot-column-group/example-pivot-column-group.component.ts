import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-pivot-column-group',
	templateUrl: 'example-pivot-column-group.component.html',
	styleUrls: ['example-pivot-column-group.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePivotColumnGroupComponent {
	static id = 'pivot-column-group';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
