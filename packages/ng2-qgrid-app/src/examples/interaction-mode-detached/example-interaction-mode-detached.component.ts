import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'interaction-mode-detached',
	'Interaction with row is available using "Alert" button'
];

@Component({
	selector: 'example-interaction-mode-detached',
	templateUrl: 'example-interaction-mode-detached.component.html',
	styleUrls: ['example-interaction-mode-detached.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleInteractionModeDetachedComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	testDetached() {
		alert(':-)');
	}
}
