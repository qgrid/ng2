import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-interaction-mode-readonly',
	templateUrl: 'example-interaction-mode-readonly.component.html',
	styleUrls: ['example-interaction-mode-readonly.component.scss'],
	providers: [DataService]
})
export class ExampleInteractionModeReadonlyComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	testAttached() {
		alert(':-)');
	}
}