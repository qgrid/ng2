import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'column-list-basic',
	'Grid content is a list, which can be switched using UI buttons'
];

@Component({
	selector: 'example-column-list-basic',
	templateUrl: 'example-column-list-basic.component.html',
	styleUrls: ['example-column-list-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnListBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	group = '';
	rows$: Observable<Human[]> = this.dataService.getPeople();

	constructor(private dataService: DataService) {}
}
