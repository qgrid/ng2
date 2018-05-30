import { Component} from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-legend-basic',
	templateUrl: 'example-legend-basic.component.html',
	styleUrls: ['example-legend-basic.component.scss'],
	providers: [DataService]
})
export class ExampleLegendBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
