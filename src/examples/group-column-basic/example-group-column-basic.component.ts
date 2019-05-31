import {Component, ChangeDetectionStrategy} from '@angular/core';
import {DataService, Human} from '../data.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'example-group-column-basic',
	templateUrl: 'example-group-column-basic.component.html',
	styleUrls: ['example-group-column-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleGroupColumnBasicComponent {

	static id = 'group-column-basic';

	rows: Observable<Human[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getPeople();
	}

}
