import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-generate-column-cohort',
	templateUrl: 'example-generate-column-cohort.component.html',
	styleUrls: ['example-generate-column-cohort.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleGenerateColumnCohortComponent {
	static id = 'generate-column-cohort';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
