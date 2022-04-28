import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-grid-size',
	templateUrl: 'example-grid-size.component.html',
	styleUrls: ['example-grid-size.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleGridSizeComponent {
	static id = 'grid-size';

	rows: Observable<Human[]>;
	sizeClass = 'fill';

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
