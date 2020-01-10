import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-details-row-custom',
	templateUrl: 'example-details-row-custom.component.html',
	styleUrls: ['example-details-row-custom.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDetailsRowCustomComponent {
	static id = 'details-row-custom';

	rows$: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows$ = dataService.getAtoms();
	}
}
