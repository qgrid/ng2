import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-look-atoms-customized',
	templateUrl: 'example-look-atoms-customized.component.html',
	styleUrls: ['example-look-atoms-customized.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleLookAtomsCustomizedComponent {
	static id = 'look-atoms-customized';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
