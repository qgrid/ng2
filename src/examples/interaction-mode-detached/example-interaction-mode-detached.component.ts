import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-interaction-mode-detached',
	templateUrl: 'example-interaction-mode-detached.component.html',
	styleUrls: ['example-interaction-mode-detached.component.scss'],
	providers: [DataService]
})
export class ExampleInteractionModeDetachedComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	testDetached() {
		alert(':-(');
	}
}