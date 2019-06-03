import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-select-cell-basic',
	templateUrl: 'example-select-cell-basic.component.html',
	styleUrls: ['example-select-cell-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSelectCellBasicComponent {
	static id = 'select-cell-basic';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}
}
