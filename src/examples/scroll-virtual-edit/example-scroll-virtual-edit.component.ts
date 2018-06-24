import { Component } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-scroll-virtual-edit',
	templateUrl: 'example-scroll-virtual-edit.component.html',
	styleUrls: ['example-scroll-virtual-edit.component.scss'],
	providers: [DataService]
})
export class ExampleScrollVirtualEditComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}