import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-scroll-virtual-group',
	templateUrl: 'example-scroll-virtual-group.component.html',
	styleUrls: ['example-scroll-virtual-group.component.scss'],
	providers: [DataService]
})
export class ExampleScrollVirtualGroupComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}