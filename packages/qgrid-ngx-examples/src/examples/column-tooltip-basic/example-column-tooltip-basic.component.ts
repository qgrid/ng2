import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'column-tooltip-basic',
	'Tooltip is shown when pointing on the first column\'s header'
];

@Component({
	selector: 'example-column-tooltip-basic',
	templateUrl: 'example-column-tooltip-basic.component.html',
	styleUrls: ['example-column-tooltip-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnTooltipBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
