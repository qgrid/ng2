import { Component} from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-look-legend-basic',
	templateUrl: 'example-look-legend-basic.component.html',
	styleUrls: ['example-look-legend-basic.component.scss'],
	providers: [DataService]
})
export class ExampleLookLegendBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
