import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
	selector: 'example-filter-row-people-basic',
	templateUrl: 'example-filter-row-people-basic.component.html',
	styleUrls: ['example-filter-row-people-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFilterRowPeopleBasicComponent {
	static id = 'filter-row-people-basic';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService
			.getPeople()
			.pipe(
				take(1),
				map(xs => {
					xs.forEach((x: any) => x.birthday = new Date(x.birthday));
					return xs;
				}));
	}
}
