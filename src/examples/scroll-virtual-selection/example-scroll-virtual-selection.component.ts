import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-scroll-virtual-selection',
	templateUrl: 'example-scroll-virtual-selection.component.html',
	styleUrls: ['example-scroll-virtual-selection.component.scss'],
	providers: [DataService]
})
export class ExampleScrollVirtualSelectionComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}