import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'define-column-basic',
	'Columns can be created in html'
];

@Component({
	selector: 'example-define-column-basic',
	templateUrl: 'example-define-column-basic.component.html',
	styleUrls: ['example-define-column-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDefineColumnBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows$: Observable<Atom[]> = this.dataService.getAtoms();

	constructor(private dataService: DataService) {
	}
}
