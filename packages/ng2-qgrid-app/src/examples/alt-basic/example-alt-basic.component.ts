import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'alt-basic',
	'Rows can be selected using Alt+[0-9] Keys'
];

@Component({
	selector: 'example-alt-basic',
	templateUrl: 'example-alt-basic.component.html',
	styleUrls: ['example-alt-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAltBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows$: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows$ = dataService.getPeople();
	}
}
