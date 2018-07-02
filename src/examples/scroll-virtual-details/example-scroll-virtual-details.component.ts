import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-scroll-virtual-details',
	templateUrl: 'example-scroll-virtual-details.component.html',
	styleUrls: ['example-scroll-virtual-details.component.scss'],
	providers: [DataService]
})
export class ExampleScrollVirtualDetailsComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}