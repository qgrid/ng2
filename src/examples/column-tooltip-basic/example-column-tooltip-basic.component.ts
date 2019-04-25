
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-column-tooltip-basic',
	templateUrl: 'example-column-tooltip-basic.component.html',
	styleUrls: ['example-column-tooltip-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnTooltipBasicComponent {
	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
