import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-generate-column-shallow',
	templateUrl: 'example-generate-column-shallow.component.html',
	styleUrls: ['example-generate-column-shallow.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleGenerateColumnShallowComponent {
	static id = 'generate-column-shallow';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
