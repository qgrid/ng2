import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'interaction-mode-readonly',
	'Interaction with row is available using "Alert" button'
];

@Component({
	selector: 'example-interaction-mode-readonly',
	templateUrl: 'example-interaction-mode-readonly.component.html',
	styleUrls: ['example-interaction-mode-readonly.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleInteractionModeReadonlyComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	testAttached() {
		alert(':-)');
	}
}
