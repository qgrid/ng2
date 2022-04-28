import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = ['cell-tooltip-basic', 'Provides a text label that is displayed when the user hovers over the cell'];

@Component({
	selector: 'example-cell-tooltip-basic',
	templateUrl: 'example-cell-tooltip-basic.component.html',
	styleUrls: ['example-cell-tooltip-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleCellTooltipBasicComponent {
	static id = EXAMPLE_TAGS[0];
	title = EXAMPLE_TAGS[1];
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
