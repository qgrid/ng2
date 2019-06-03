import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-details-row-pin',
	templateUrl: 'example-details-row-pin.component.html',
	styleUrls: ['example-details-row-pin.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ExampleDetailsRowPinComponent {
	static id = 'details-row-pin';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
