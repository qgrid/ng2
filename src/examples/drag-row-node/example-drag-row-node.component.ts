import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-drag-row-node',
	templateUrl: 'example-drag-row-node.component.html',
	styleUrls: ['example-drag-row-node.component.scss'],
	providers: [DataService]
})
export class ExampleDragRowNodeComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}