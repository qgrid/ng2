import {Component, ChangeDetectionStrategy} from '@angular/core';
import {DataService, Human} from '../data.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'example-select-mix-basic',
	templateUrl: 'example-select-mix-basic.component.html',
	styleUrls: ['example-select-mix-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSelectMixBasicComponent {

	static id = 'select-mix-basic';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

}
