import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-scroll-virtual-drag',
	templateUrl: 'example-scroll-virtual-drag.component.html',
	styleUrls: ['example-scroll-virtual-drag.component.scss'],
	providers: [DataService]
})
export class ExampleScrollVirtualDragComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}