import { Component} from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-legend-grid-basic',
	templateUrl: 'example-legend-grid-basic.component.html',
	styleUrls: ['example-legend-grid-basic.component.scss'],
	providers: [DataService]
})
export class ExampleLegendGridBasicComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
